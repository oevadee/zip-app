import { Request, Response } from "express";
import driver from "../config/db";
import Controller from "../types/Controller.type";

interface IuserWithExpeses {
  id: number;
  total: number;
  name: string;
  password: string;
  email: string;
}

const getAllUserExpenses = async (
  req: Request,
  res: Response
): Promise<any> => {
  const session = driver.session();
  const { userId } = req.query;

  try {
    const usersQuery = await session.run(
      `MATCH (a:User) WHERE NOT id(a) = toInteger($id) RETURN a`,
      { id: userId }
    );

    const users = usersQuery.records.map((el: any) => ({
      id: el.get("a").identity.low,
      total: 0,
      ...el.get("a").properties,
    }));

    const expenses: object[] = [];

    for (const user of users) {
      const inExpensesQuery = await session.readTransaction(async (txc) => {
        const result = await txc.run(
          `MATCH (a:User)<-[IS_OWED]-(e:Expense)<-[OWES]-(b:User) WHERE id(a) = toInteger($id) AND id(b) = toInteger($externalId) RETURN e`,
          { id: userId, externalId: user.id }
        );

        return result.records.map((el) => ({
          value: el.get("e").properties.value,
        }));
      });

      const incomingExpenses = inExpensesQuery.reduce(
        (acc, curr) => acc + curr.value,
        0
      );

      const outExpensesQuery = await session.readTransaction(async (txc) => {
        const result = await txc.run(
          `MATCH (a:User)-[OWES]->(e:Expense)-[IS_OWED]->(b:User) WHERE id(a) = toInteger($id) AND id(b) = toInteger($externalId) RETURN e`,
          { id: userId, externalId: user.id }
        );
        return await result.records.map((el: any) => ({
          value: el.get("e").properties.value,
        }));
      });

      const outgoingExpenses = outExpensesQuery.reduce(
        (acc, curr) => acc + curr.value,
        0
      );

      const sum = incomingExpenses - outgoingExpenses;

      const expense = {
        value: sum.toFixed(),
        user: user,
      };
      expenses.push(expense);
    }

    return res.json({ expenses, users });
  } catch (err) {
    console.log(err);
    return res
      .status(400)
      .json({ message: "There was an error with getting user expenses" });
  } finally {
    session.close();
  }
};

const createExpense = async (req: Request, res: Response): Promise<any> => {
  const { userId } = req.params;
  const { values, timestamp } = req.body;
  const session = driver.session();

  try {
    const { value, details, user } = values;
    const newValue = Math.abs(+value);

    const [expense] = await session.writeTransaction(async (txc) => {
      const result = await txc.run(
        `
        MATCH (a:User), (b:User) 
        WHERE id(a) = toInteger($id) AND id(b) = toInteger($externalId) 
        CREATE (a)-[:OWES]->(e:Expense {details: $details, timestamp: $timestamp, value: $value})-[:IS_OWED]->(b) RETURN e
      `,
        +value > 0
          ? {
              id: user,
              externalId: userId,
              details,
              timestamp,
              value: newValue,
            }
          : +value === 0
          ? new Error("You cant create an empy expense.")
          : {
              id: userId,
              externalId: user,
              details,
              timestamp,
              value: newValue,
            }
      );
      return result.records.map((el: any) => el.get("e").properties);
    });

    return res.json(expense);
  } catch (err) {
    console.error(err);
    return res
      .status(400)
      .json({ message: "The was an error while creating new expense." });
  } finally {
    session.close();
  }
};

const getHistory = async (req: Request, res: Response): Promise<any> => {
  const { externalId } = req.params;
  const { userId } = req.query;
  const session = driver.session();

  try {
    const outHistory = await session.readTransaction(async (txc) => {
      const result = await txc.run(
        `
        MATCH (a:User)-[:OWES]->(e:Expense)-[:IS_OWED]->(b:User)
        WHERE id(a) = toInteger($userId)
        AND id(b) = toInteger($externalId)
        RETURN b.name as name, b.photo as photo, e
      `,
        {
          userId,
          externalId,
        }
      );

      return result.records.map((el) => ({
        name: el.get("name"),
        photo: el.get("photo"),
        id: el.get("e").identity.low,
        ...el.get("e").properties,
      }));
    });

    const preparedOutHistory = outHistory.map((el) => ({
      ...el,
      value: -el.value,
    }));

    const inHistory = await session.readTransaction(async (txc) => {
      const result = await txc.run(
        `
        MATCH (a:User)-[:OWES]->(e:Expense)-[:IS_OWED]->(b:User)
        WHERE id(a) = toInteger($externalId)
        AND id(b) = toInteger($userId)
        RETURN a.name as name, a.photo as photo, e
      `,
        {
          externalId,
          userId,
        }
      );

      return result.records.map((el) => ({
        name: el.get("name"),
        photo: el.get("photo"),
        id: el.get("e").identity.low,
        ...el.get("e").properties,
      }));
    });

    return res.json({
      inHistory,
      outHistory: preparedOutHistory,
    });
  } catch (err) {
    console.error(err);
    return res
      .status(400)
      .json({ message: "There was an error with getting history" });
  } finally {
    session.close();
  }
};

const handleDeleteRequest: Controller = async (req, res) => {
  const values = req.body;
  const { user: userId, expenseId } = values;
  const session = driver.session();

  try {
    await session.writeTransaction(
      async (txc) =>
        await txc.run(
          `
        MATCH (a:User), (e:Expense) 
        WHERE id(a) = toInteger($userId) 
        AND id(e) = toInteger($expenseId) 
        CREATE (a)-[:REQUESTED_DELETION]->(e)
        SET e.deletion_requested = TRUE
        RETURN a, e
      `,
          {
            userId,
            expenseId,
          }
        )
    );

    return res.json();
  } catch (err) {
    console.error(err);
    return res
      .status(400)
      .json({ message: "There was an error with sending delete request." });
  }
};

const handleAcceptRequest: Controller = async (req, res) => {
  const { notificationId } = req.query;
  const session = driver.session();

  try {
    await session.writeTransaction(
      async (txc) =>
        await txc.run(
          `
        MATCH (e:Expense) WHERE id(e) = toInteger($notificationId) DETACH DELETE e
      `,
          {
            notificationId,
          }
        )
    );

    return res.json();
  } catch (err) {
    console.error(err);
    return res
      .status(400)
      .json({ message: "There was an error with accepting deletion request." });
  }
};

const getExpenseNotifications: Controller = async (req, res) => {
  const { userId } = req.query;
  const session = driver.session();

  try {
    const notifications = await session.readTransaction(async (txc) => {
      const result = await txc.run(
        `
        MATCH (a:User), (b:User), (e:Expense) WHERE (a)-[:REQUESTED_DELETION]->(e)-[]->(b) AND id(b) = toInteger($userId) AND NOT id(a) = toInteger($userId) RETURN a.name, a.photo, e
      `,
        { userId }
      );

      return result.records.map((el: any) => ({
        id: el.get("e").identity.low,
        ...el.get("e").properties,
        name: el.get("a.name"),
        photo: el.get("a.photo"),
      }));
    });

    return res.json(notifications);
  } catch (err) {
    console.error(err);
    return res
      .status(400)
      .json({ message: "There was an error with getting all notifications." });
  }
};

export {
  getAllUserExpenses,
  createExpense,
  getHistory,
  handleDeleteRequest,
  handleAcceptRequest,
  getExpenseNotifications,
};
