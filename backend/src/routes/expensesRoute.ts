import express from "express";

import {
  getAllUserExpenses,
  createExpense,
  getHistory,
  handleDeleteRequest,
  handleAcceptRequest,
  getExpenseNotifications,
} from "../controllers/expensesController";

const router = express.Router();

router.get("/", getAllUserExpenses);
router.post("/create/:userId", createExpense);
router.get("/history/:externalId", getHistory);
router.post("/delete-request", handleDeleteRequest);
router.delete("/accept-request", handleAcceptRequest);
router.get("/notifications", getExpenseNotifications);

export default router;
