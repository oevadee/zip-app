import { Request, Response } from "express";
import session from "../config/db";
import bcrypt from "bcrypt";

const login = async (req: Request, res: Response): Promise<any> => {
  try {
    const { email, password } = req.body;

    const [dbUser] = await session.readTransaction(async (txc) => {
      const result = await txc.run(
        `
        MATCH (a:User {email: $email})
        RETURN a
      `,
        { email: email }
      );

      return result.records.map((el: any) => ({
        id: el.get("a").identity.low,
        ...el.get("a").properties,
      }));
    });

    if (bcrypt.compareSync(password, dbUser.password)) {
      const newData = {
        id: dbUser.id,
        name: dbUser.name,
        email: dbUser.email,
      };
      return res.status(200).json(newData);
    } else return res.status(400).json({ message: "Auth failed." });
  } catch (err) {
    console.error(err);
    return res.status(400).json({ message: "Auth failed." });
  }
};

const register = async (req: Request, res: Response): Promise<any> => {
  try {
    const { email, password, confirmPassword } = req.body;

    const dbUser = await session.readTransaction((txc) => {
      const result = txc.run(
        `
        MATCH (a:User {email: $email}) RETURN a
      `,
        {
          email: email,
        }
      );

      return result;
    });

    const [data] = dbUser.records.map((el: any) => ({
      id: el.get("a").identity.low,
      ...el.get("a").properties,
    }));

    if (!data && password === confirmPassword) {
      const hash = await bcrypt.hash(password, 10);

      const data = await session.writeTransaction(async (txc) => {
        const result = await txc.run(
          `
        CREATE (a:User {email: $email, password: $password}) RETURN a
      `,
          {
            email,
            password: hash,
          }
        );
        return result.records.map((el: any) => ({
          id: el.get("a").identity.low,
          ...el.get("a").properties,
        }));
      });

      console.log(data);

      return res.json(data);
    } else
      return res
        .status(400)
        .json({ message: "There was an error with registration new account" });
  } catch (err) {
    console.error(err);
    return res.status(400).json({
      message: "There was an error with registration new account.",
    });
  }
};

const getUsers = async (req: Request, res: Response): Promise<any> => {
  try {
    const users = await session.readTransaction(async (txc) => {
      const result = await txc.run(`
        MATCH (u:User) RETURN u as user
        `);

      return result.records.map((el: any) => ({
        id: el.get("user").identity.low,
        ...el.get("user").properties,
      }));
    });

    return res.json(users);
  } catch (err) {
    console.error(err);
    return res
      .status(400)
      .json({ message: "There was an error while loading users" });
  }
};

export { login, register, getUsers };
