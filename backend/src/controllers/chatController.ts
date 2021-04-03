import { Request, Response } from "express";
import session from "../config/db";

const createNewMessage = async (req: Request, res: Response): Promise<any> => {
  const { userId } = req.query;
  const { message, timestamp } = req.body;

  console.log(userId, message, timestamp);
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

    console.log(channels);

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

export { createNewMessage, getAllChannels, createNewChannel };
