import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import driver from '../config/db';
import jwt from 'jsonwebtoken';
import Controller from '../types/Controller.type';
import { upload } from '../storage/usersStorage';
import fs from 'fs';
import config from '../config';
import path from 'path';

const imagePath = `${process.env.STATIC_FILES_HOST}/users`;

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
        id: el.get('a').identity.low,
        ...el.get('a').properties,
      }));
    });

    const { password: dbPassword, ...restOfDbUser } = dbUser;

    if (bcrypt.compareSync(password, dbPassword)) {
      const userToAdd = {
        ...restOfDbUser,
        photo: `${imagePath}/${dbUser.photo}`,
      };
      jwt.sign({ id: userToAdd.id }, 'secretkey', (err, token) => {
        if (err) return res.status(403);
        return res.json({
          user: userToAdd,
          token,
        });
      });
    } else return res.status(400).json({ message: 'Auth failed.' });
  } catch (err) {
    return res.status(400).json({ message: 'Auth failed.' });
  } finally {
    session.close();
  }
};

const register: Controller = async (req, res) => {
  const session = driver.session();
  try {
    const { email, password, confirmPassword, name } = req.body;

    const [dbUser] = await session.readTransaction(async (txc) => {
      const result = await txc.run(
        `
        MATCH (a:User {email: $email}) RETURN a
      `,
        {
          email,
        }
      );

      return result.records.map((el: any) => ({
        id: el.get('a').identity.low,
        ...el.get('a').properties,
      }));
    });

    if (!dbUser && password === confirmPassword) {
      const hash = await bcrypt.hash(password, 10);

      const [newUser] = await session.writeTransaction(async (txc) => {
        const result = await txc.run(
          `
        CREATE (a:User {email: $email, password: $password, name: $name}) RETURN a
      `,
          {
            email,
            password: hash,
            name,
          }
        );
        return result.records.map((el: any) => ({
          id: el.get('a').identity.low,
          ...el.get('a').properties,
        }));
      });

      const { password: newPassword, ...userToAdd } = newUser;

      jwt.sign({ id: userToAdd.id }, 'secretkey', (err, token) => {
        if (err) return res.status(403);
        return res.json({
          user: userToAdd,
          token,
        });
      });
    } else
      return res
        .status(400)
        .json({ message: 'There was an error with registration new account' });
  } catch (err) {
    return res.status(400).json({
      message: 'There was an error with registration new account.',
    });
  } finally {
    session.close();
  }
};

const getProfile: Controller = async (req, res) => {
  const { userId } = req.query;
  const session = driver.session();

  if (!userId) {
    console.log('Auth failed!');
    return res.json();
  }

  try {
    const [user] = await session.readTransaction(async (txc) => {
      const result = await txc.run(
        `
        MATCH (a:User) WHERE id(a) = toInteger($userId) RETURN a
      `,
        { userId }
      );

      return result.records.map((el: any) => ({
        id: el.get('a').identity.low,
        name: el.get('a').properties.name,
        email: el.get('a').properties.email,
        photo: `${imagePath}/${el.get('a').properties.photo}`,
      }));
    });

    return res.json(user);
  } catch (err) {
    return res
      .status(400)
      .json({ message: 'There was an error with getting profile info.' });
  }
};

const updateProfile: Controller = async (req, res) => {
  upload(req, res, async (err: any) => {
    const { userId } = req.query;
    const session = driver.session();
    const values = JSON.parse(req.body.values);

    if (err) {
      return res.status(400).json({ message: err.message });
    }

    try {
      const { password, confirmPassword, name } = values;

      if (password && password === confirmPassword) {
        const hash = await bcrypt.hash(password, 10);
        await session.writeTransaction(async (txc) => {
          await txc.run(
            `
            MATCH (a:User) WHERE id(a) = toInteger($userId) SET a.password = $hash
          `,
            { userId, hash }
          );
        });
      }

      if (name) {
        await session.writeTransaction(async (txc) => {
          await txc.run(
            `
            MATCH (a:User) WHERE id(a) = toInteger($userId) SET a.name = $name
          `,
            {
              userId,
              name,
            }
          );
        });
      }

      //@ts-ignore
      if (req.files.file) {
        //@ts-ignore
        const photo = req.files.file[0].filename;

        const [oldPhoto] = await session.readTransaction(async (txc) => {
          const result = await txc.run(
            `MATCH (a: User) WHERE id(a) = toInteger($userId) RETURN a.photo`,
            {
              userId,
            }
          );
          return result.records.map((r: any) => ({
            photo: r.get('a.photo'),
          }));
        });

        await session.writeTransaction(async (txc) => {
          txc
            .run(
              `
            MATCH (a:User) WHERE id(a) = toInteger($userId) SET a.photo = $photo
          `,
              {
                userId,
                photo,
              }
            )
            .then(() => {
              try {
                fs.unlinkSync(
                  path.join(__dirname + '../../../../uploads') +
                    '/users/' +
                    oldPhoto.photo
                );
              } catch (err) {
                console.log('Failed to unlink old photo');
              }
            })
            .catch((err) => {
              console.log('Failed to update photo');
            });
        });
      }

      return res.json({
        message: 'Profile updated.',
      });
    } catch (err) {
      return res
        .status(400)
        .json({ message: 'There was an error with updating profile.' });
    } finally {
      session.close();
    }
  });
};

const getUsers = async (req: Request, res: Response): Promise<any> => {
  const session = driver.session();
  try {
    const users = await session.readTransaction(async (txc) => {
      const result = await txc.run(`
        MATCH (u:User) RETURN u as user
        `);

      return result.records.map((el: any) => ({
        id: el.get('user').identity.low,
        photo: `${imagePath}/${el.get('user').properties.photo}`,
        ...el.get('user').properties,
      }));
    });

    return res.json(users);
  } catch (err) {
    return res
      .status(400)
      .json({ message: 'There was an error while loading users' });
  } finally {
    session.close();
  }
};

export { login, register, getProfile, updateProfile, getUsers };
