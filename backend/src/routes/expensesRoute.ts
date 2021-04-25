import express from "express";

import {
  getAllUserExpenses,
  createExpense,
  getHistory,
  requestDeletion,
  acceptDeletion,
  rejectDeletion,
  getExpenseNotifications,
} from "../controllers/expensesController";

const router = express.Router();

router.get("/", getAllUserExpenses);
router.post("/create/:userId", createExpense);
router.get("/history/:externalId", getHistory);
router.post("/delete-request", requestDeletion);
router.delete("/accept-request", acceptDeletion);
router.put("/reject-request", rejectDeletion);
router.get("/notifications", getExpenseNotifications);

export default router;
