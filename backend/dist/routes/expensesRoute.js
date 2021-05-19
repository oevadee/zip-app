"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const expensesController_1 = require("../controllers/expensesController");
const router = express_1.default.Router();
router.get("/", expensesController_1.getAllUserExpenses);
router.post("/create/:userId", expensesController_1.createExpense);
router.get("/history/:externalId", expensesController_1.getHistory);
router.post("/delete-request", expensesController_1.requestDeletion);
router.delete("/accept-request", expensesController_1.acceptDeletion);
router.put("/reject-request", expensesController_1.rejectDeletion);
router.get("/notifications", expensesController_1.getExpenseNotifications);
exports.default = router;
//# sourceMappingURL=expensesRoute.js.map