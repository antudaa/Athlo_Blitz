import express from "express";
import requestValidator from "../../middlewares/validateRequest";
import { bookingValidations } from "./bookings.validation";
import { BookingControllers } from "./booking.controller";
import {
  authenticateUser,
  authorizeAdmin,
  authorizeUser,
} from "../../middlewares/auth";

const router = express.Router();

router.post(
  "/",
  authenticateUser,
  authorizeUser,
  requestValidator(bookingValidations.createBookingValidationSchema),
  BookingControllers.createBooking,
);

router.get(
  "/",
  authenticateUser,
  authorizeAdmin,
  BookingControllers.viewAllBookingsByAdmin,
);

router.get(
  "/user",
  authenticateUser,
  authorizeUser,
  BookingControllers.viewBookingsByUser,
);

router.delete(
    "/:id",
    authenticateUser,
    authorizeUser,
    BookingControllers.cancleBookingByUser,
  );

export const BookingRoutes = router;
