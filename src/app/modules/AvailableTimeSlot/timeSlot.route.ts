import express from "express";
import requestValidator from "../../middlewares/validateRequest";
import { TimeSlotValidation } from "./timeSlot.validation";
import { TimeSlotControllers } from "./timeSlot.controller";

const router = express.Router();

router.post(
  "/",
  requestValidator(TimeSlotValidation.createTimeSlotValidationSchema),
  TimeSlotControllers.createTimeSlot,
);

export const TimeSoltRoutes = router;
