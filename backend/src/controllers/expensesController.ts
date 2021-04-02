import { Request, Response } from "express";
import txc, { session } from "../config/db";

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
    const usersQuery = await txc.run(
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
      const inExpensesQuery = await txc.run(
        `MATCH (a:User)<-[IS_OWED]-(e:Expense)<-[OWES]-(b:User) WHERE id(a) = toInteger($id) AND id(b) = toInteger($externalId) RETURN e`,
        { id: userId, externalId: user.id }
      );

      const inExpenses = inExpensesQuery.records.map((el: any) => ({
        value: el.get("e").properties.value,
      }));

      const incomingExpenses = inExpenses.reduce(
        (acc, curr) => acc + curr.value,
        0
      );

      const outExpensesQuery = await txc.readTransaction((txc) => {
        const result = txc.run(
          `MATCH (a:User)-[OWES]->(e:Expense)-[IS_OWED]->(b:User) WHERE id(a) = toInteger($id) AND id(b) = toInteger($externalId) RETURN e`,
          { id: userId, externalId: user.id }
        );
        return result;
      });

      const outExpenses = outExpensesQuery.records.map((el: any) => ({
        value: el.get("e").properties.value,
      }));

      const outgoingExpenses = outExpenses.reduce(
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

export { getAllUserExpenses };
