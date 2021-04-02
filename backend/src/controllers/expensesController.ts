import { Request, Response } from "express";
import session from "../config/db";

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

        return result.records.map((el: any) => ({
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
  }
};

const createExpense = async (req: Request, res: Response): Promise<any> => {
  const { userId } = req.query;
  const { values, timestamp } = req.body;

  try {
    const { value, details, user } = values;

    await session.writeTransaction((txc) => {
      txc.run(
        `
        MATCH (a:User) (b:User) WHERE id(a) = toInteger($id) AND id(b) = toInteger($externalId) CREATE (a)-[OWES]->(e:Expense {})-[IS_OWED]->(b)
      `,
        value > 0
          ? {
              id: user,
              externalId: userId,
            }
          : value === 0
          ? new Error("You cant create an empy expense.")
          : {
              id: userId,
              externalId: user,
            }
      );
    });

    return res.json();
  } catch (err) {
    console.error(err);
    return res
      .status(400)
      .json({ message: "The was an error while creating new expense." });
  }
};

const getHistory = async (req: Request, res: Response): Promise<any> => {};

export { getAllUserExpenses, createExpense, getHistory };