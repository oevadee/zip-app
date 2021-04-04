import { Request, Response } from "express";
import session from "../config/db";

const getAllMessages = async (req: Request, res: Response): Promise<any> => {
  const { channelId } = req.params;

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
        user: el.get("a").properties,
      }));
    });

    console.log(messages);
    return res.json(messages);
  } catch (err) {
    console.error(err);
    return res
      .status(400)
      .json({ message: "There was an error with getting all messages" });
  }
};

const createNewMessage = async (req: Request, res: Response): Promise<any> => {
  const { userId } = req.query;
  const { message, timestamp, channelId } = req.body;

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
    console.log(newMessage);

    return res.json(newMessage);
  } catch (err) {
    console.error(err);
    return res
      .status(400)
      .json({ message: "There was an error creating new message" });
  }
};

const getAllChannels = async (req: Request, res: Response): Promise<any> => {
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
  }
};

const createNewChannel = async (req: Request, res: Response): Promise<any> => {
  const { channelName } = req.body;

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

    return res.json(newChannel);
  } catch (err) {
    console.error(err);
    return res
      .status(400)
      .json({ message: "There was an error while creating new channel" });
  }
};

export { getAllMessages, createNewMessage, getAllChannels, createNewChannel };
