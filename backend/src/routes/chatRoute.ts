import express from "express";

import {
  getAllMessages,
  createNewMessage,
  getAllChannels,
  createNewChannel,
} from "../controllers/chatController";

const router = express.Router();

router.get("/messages/:channelId", getAllMessages);
router.post("/messages", createNewMessage);
router.get("/channel", getAllChannels);
router.post("/channel", createNewChannel);

export default router;
