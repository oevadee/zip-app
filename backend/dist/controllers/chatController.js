"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createNewChannel = exports.getAllChannels = exports.createNewMessage = exports.getAllMessages = void 0;
const db_1 = __importDefault(require("../config/db"));
const imagePath = `${process.env.SERVER}/users`;
const getAllMessages = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { channelId } = req.params;
    const session = db_1.default.session();
    try {
        const messages = yield session.readTransaction((txc) => __awaiter(void 0, void 0, void 0, function* () {
            const result = yield txc.run(`
        MATCH (c:Channel)<-[WAS_CREATED]-(m:Message)<-[CREATED]-(a:User) WHERE id(c) = toInteger($channelId) RETURN m, a
      `, {
                channelId,
            });
            return result.records.map((el) => ({
                message: Object.assign({ id: el.get("m").identity.low }, el.get("m").properties),
                user: Object.assign(Object.assign({}, el.get("a").properties), { photo: `${imagePath}/${el.get("a").properties.photo}` }),
            }));
        }));
        return res.json(messages);
    }
    catch (err) {
        console.error(err);
        return res
            .status(400)
            .json({ message: "There was an error with getting all messages" });
    }
    finally {
        session.close();
    }
});
exports.getAllMessages = getAllMessages;
const createNewMessage = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { userId } = req.query;
    const { message, timestamp, channelId } = req.body;
    const session = db_1.default.session();
    try {
        const [newMessage] = yield session.writeTransaction((txc) => __awaiter(void 0, void 0, void 0, function* () {
            const result = yield txc.run(`
        MATCH (a:User), (c:Channel) WHERE id(a) = toInteger($userId) AND id(c) = toInteger($channelId) CREATE (a)-[:CREATED]->(m:Message {message: $message, timestamp: $timestamp})-[:WAS_CREATED]->(c) RETURN m
      `, {
                userId,
                channelId,
                message,
                timestamp,
            });
            return result.records.map((el) => el.get("m").properties);
        }));
        return res.json(newMessage);
    }
    catch (err) {
        console.error(err);
        return res
            .status(400)
            .json({ message: "There was an error creating new message" });
    }
    finally {
        session.close();
    }
});
exports.createNewMessage = createNewMessage;
const getAllChannels = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const session = db_1.default.session();
    try {
        const channels = yield session.readTransaction((txc) => __awaiter(void 0, void 0, void 0, function* () {
            const result = yield txc.run(`
        MATCH (a:Channel) RETURN a
      `);
            return result.records.map((el) => (Object.assign({ id: el.get("a").identity.low }, el.get("a").properties)));
        }));
        return res.json(channels);
    }
    catch (err) {
        console.error(err);
        return res
            .status(400)
            .json({ message: "There was an error with getting all channels" });
    }
    finally {
        session.close();
    }
});
exports.getAllChannels = getAllChannels;
const createNewChannel = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { channelName } = req.body;
    const session = db_1.default.session();
    try {
        const [newChannel] = yield session.writeTransaction((txc) => __awaiter(void 0, void 0, void 0, function* () {
            const result = yield txc.run(`
        CREATE (a:Channel {name: $channelName}) RETURN a
      `, {
                channelName,
            });
            return result.records.map((el) => (Object.assign({ id: el.get("a").identity.low }, el.get("a").properties)));
        }));
        return res.json();
    }
    catch (err) {
        console.error(err);
        return res
            .status(400)
            .json({ message: "There was an error while creating new channel" });
    }
    finally {
        session.close();
    }
});
exports.createNewChannel = createNewChannel;
//# sourceMappingURL=chatController.js.map