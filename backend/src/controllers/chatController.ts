import { Request, Response } from "express";
import driver from "../config/db";

const imagePath = `${process.env.STATIC_FILES_HOST}/users`;

const getAllMessages = async (req: Request, res: Response): Promise<any> => {
  const { channelId } = req.params;
  const session = driver.session();

  try {
    const messages = await session.readTransaction(async (txc) => {
      const result = await txc.run(
        `
        MATCH (c:Channel)<-[WAS_CREATED]-(m:Message)<-[CREATED]-(a:User) WHERE id(c) = toInteger($channelId) RETURN m, a
      `,
        {
          channelId,
        }
      );

      return result.records.map((el) => ({
        message: {
          id: el.get("m").identity.low,
          ...el.get("m").properties,
        },
        user: { 
          ...el.get("a").properties,
          photo: `${imagePath}/${el.get("a").properties.photo}`
        },
      }));
    });

    return res.json(messages);
  } catch (err) {
    console.error(err);
    return res
      .status(400)
      .json({ message: "There was an error with getting all messages" });
  } finally {
    session.close();
  }
};

const createNewMessage = async (req: Request, res: Response): Promise<any> => {
  const { userId } = req.query;
  const { message, timestamp, channelId } = req.body;
  const session = driver.session();

  try {
    const [newMessage] = await session.writeTransaction(async (txc) => {
      const result = await txc.run(
        `
        MATCH (a:User), (c:Channel) WHERE id(a) = toInteger($userId) AND id(c) = toInteger($channelId) CREATE (a)-[:CREATED]->(m:Message {message: $message, timestamp: $timestamp})-[:WAS_CREATED]->(c) RETURN m
      `,
        {
          userId,
          channelId,
          message,
          timestamp,
        }
      );
      
      return result.records.map((el: any) => el.get("m").properties);
    });

    return res.json(newMessage);
  } catch (err) {
    console.error(err);
    return res
      .status(400)
      .json({ message: "There was an error creating new message" });
  } finally {
    session.close();
  }
};

const getAllChannels = async (req: Request, res: Response): Promise<any> => {
  const session = driver.session();
  try {
    const channels = await session.readTransaction(async (txc) => {
      const result = await txc.run(`
        MATCH (a:Channel) RETURN a
      `);

      return result.records.map((el: any) => ({
        id: el.get("a").identity.low,
        ...el.get("a").properties,
      }));
    });

    return res.json(channels);
  } catch (err) {
    console.error(err);
    return res
      .status(400)
      .json({ message: "There was an error with getting all channels" });
  } finally {
    session.close();
  }
};

const createNewChannel = async (req: Request, res: Response): Promise<any> => {
  const { channelName } = req.body;
  const session = driver.session();

  try {
    const [newChannel] = await session.writeTransaction(async (txc) => {
      const result = await txc.run(
        `
        CREATE (a:Channel {name: $channelName}) RETURN a
      `,
        {
          channelName,
        }
      );

      return result.records.map((el: any) => ({
        id: el.get("a").identity.low,
        ...el.get("a").properties,
      }));
    });

    return res.json();
  } catch (err) {
    console.error(err);
    return res
      .status(400)
      .json({ message: "There was an error while creating new channel" });
  } finally {
    session.close();
  }
};

export { getAllMessages, createNewMessage, getAllChannels, createNewChannel };
