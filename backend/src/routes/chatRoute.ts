import express from "express";

import {
  createNewMessage,
  getAllChannels,
  createNewChannel,
} from "../controllers/chatController";

const router = express.Router();

router.post("/", createNewMessage);
router.get("/channel", getAllChannels);
router.post("/channel", createNewChannel);

export default router;
