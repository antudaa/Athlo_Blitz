import express from "express";
import { TimeSlotControllers } from "./timeSlot.controller";
import { authenticateUser } from "../../middlewares/auth";

const router = express.Router();

router.get(
  "/",
  authenticateUser,
  TimeSlotControllers.getAvailableTimeSlot,
);

export const TimeSoltRoutes = router;
