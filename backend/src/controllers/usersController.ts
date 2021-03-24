import { Request, Response } from "express";
import txc from "../db";

const getUsers = async (req: Request, res: Response): Promise<any> => {
  try {
    const result = await txc.run(`MATCH (u:User) RETURN u as user`)
  
    const data = result.records.map((el: any) => ({
      id: el.get('user').identity.low,
      ...el.get('user').properties
    }));
  
    return res.json(data);
  } catch (err) {
    console.error(err);
    return res.status(400).json({ message: 'There was an error while loading users' });
  }
};

export { getUsers };
