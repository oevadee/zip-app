import { Request, Response } from "express";
import bcrypt from "bcrypt";
import driver from "../config/db";
import jwt from "jsonwebtoken";
import Controller from "../types/Controller.type";

const login = async (req: Request, res: Response): Promise<any> => {
  const session = driver.session();
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

    const { password: dbPassword, ...restOfDbUser } = dbUser;

    if (bcrypt.compareSync(password, dbPassword)) {
      const userInfo = restOfDbUser;

      jwt.sign({ userInfo }, "secretkey", (err, token) => {
        if (err) return res.status(403);
        return res.json({
          user: userInfo,
          token,
        });
      });
    } else return res.status(400).json({ message: "Auth failed." });
  } catch (err) {
    console.error(err);
    return res.status(400).json({ message: "Auth failed." });
  } finally {
    session.close();
  }
};

const register = async (req: Request, res: Response): Promise<any> => {
  const session = driver.session();
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
  } finally {
    session.close();
  }
};

const updateProfile: Controller = async (req, res) => {
  const values = req.body;
  const { userId } = req.query;
  const session = driver.session();

  try {
    const { password, confirmPassword } = values;
    if (password === confirmPassword) {
      const hash = await bcrypt.hash(password, 10);
      await session.writeTransaction(async (txc) => {
        await txc.run(
          `
          MATCH (a:User) WHERE id(a) = toInteger($userId) SET a.password = $hash
        `,
          { userId, hash }
        );
      });
      return res.json({ message: "Password changed." });
    } else return res.status(400).json({ message: "Passwords do not match." });
  } catch (err) {
    console.error(err);
    return res
      .status(400)
      .json({ message: "There was an error with updating profile." });
  }
};

const getUsers = async (req: Request, res: Response): Promise<any> => {
  const session = driver.session();
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
  } finally {
    session.close();
  }
};

export { login, register, updateProfile, getUsers };
