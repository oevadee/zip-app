"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const chatController_1 = require("../controllers/chatController");
const router = express_1.default.Router();
router.get("/messages/:channelId", chatController_1.getAllMessages);
router.post("/messages", chatController_1.createNewMessage);
router.get("/channel", chatController_1.getAllChannels);
router.post("/channel", chatController_1.createNewChannel);
exports.default = router;
//# sourceMappingURL=chatRoute.js.map