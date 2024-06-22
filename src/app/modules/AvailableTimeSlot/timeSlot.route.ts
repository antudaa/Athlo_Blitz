import express from "express";
import { TimeSlotControllers } from "./timeSlot.controller";

const router = express.Router();

router.get(
  "/",
  TimeSlotControllers.getAvailableTimeSlot,
);

export const TimeSoltRoutes = router;
