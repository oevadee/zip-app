"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const usersController_1 = require("../controllers/usersController");
const router = express_1.default.Router();
router.get("/", usersController_1.getUsers);
router.post("/login", usersController_1.login);
router.post("/register", usersController_1.register);
router.get("/profile", usersController_1.getProfile);
router.put("/profile", usersController_1.updateProfile);
exports.default = router;
//# sourceMappingURL=usersRoute.js.map