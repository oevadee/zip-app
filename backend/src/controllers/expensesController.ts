import { Request, Response } from "express";
import txc from "../db";

const getExpensesFromUser = async (
  req: Request,
  res: Response
): Promise<any> => {
  const { userId: otherUserId } = req.params;
  const userId = req.body.values.userId;

  const result = await txc.run(`MATCH (u: User {id: $id1})-[r]->(a:User {id: $id2}) RETURN r`, {id1: otherUserId, id2: userId})

  const data = result.records.map((el: any) => ({
    id: el.get('r').identity.low,
    ...el.get('r').properties
  }))

  console.log(data);
};

export { getExpensesFromUser };
