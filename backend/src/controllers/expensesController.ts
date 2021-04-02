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

    for (const user of users) {
      const inExpensesQuery = await txc.run(
        `MATCH (a:User)<-[IS_OWED]-(e:Expense)<-[OWES]-(b:User) WHERE id(a) = toInteger($id) AND id(b) = toInteger($externalId) RETURN a, b, e`,
        { id: userId, externalId: user.id }
      );

      const inExpenses = inExpensesQuery.records.map((el: any) => ({
        value: el.get("e").properties.value,
          // ? el.get("e").properties.value.low
          // : el.get("e").properties.value,
        user: el.get("b").identity.low,
      }));

      console.log(inExpenses);

      const incomingExpenses = inExpenses.map((el) => typeof el.value);

      // console.log(incomingExpenses);

      const outExpensesQuery = await txc.run(
        `MATCH (a:User)<-[IS_OWED]-(e:Expense)<-[OWES]-(b:User) WHERE id(a) = toInteger($id) RETURN a, b, e`,
        { id: userId }
      );

      const outExpenses = outExpensesQuery.records.map((el: any) => ({
        value: el.get("e").properties.value.low
          ? el.get("e").properties.value.low
          : el.get("e").properties.value,
        user: el.get("b").identity.low,
      }));
    }

    // console.log(users);

    // const outgoingExpenses = outExpenses.reduce(
    //   (acc: any, curr: any, i: number, arr: any[]) => {
    //     return [
    //       ...acc,
    //       (acc[curr.user].total = acc[curr.user].total + +curr.value),
    //     ];
    //   },
    //   users
    // );

    return res.json();
  } catch (err) {
    console.log(err);
    return res
      .status(400)
      .json({ message: "There was an error with getting user expenses" });
  }
};

export { getAllUserExpenses };
