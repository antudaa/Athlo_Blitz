import { RequestHandler } from "express";
import catchAsync from "../../utils/catchAsync";
import { BookingService } from "./bookings.service";
import sendResponse from "../../utils/sendResponse";
import httpStatus from "http-status";
import { getUserIdFromToken } from "../../middlewares/auth";
import AppError from "../../Errors/AppError";

const createBooking: RequestHandler = catchAsync(async (req, res) => {
  console.log(req.body);
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) {
    throw new AppError(httpStatus.UNAUTHORIZED, "You are not authorized!");
  }
  const userId = getUserIdFromToken(req);

  const bookingInfo = { ...req.body, user: userId };
  const result = await BookingService.createBookingIntoDB(bookingInfo);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Booking created successfully",
    data: result,
  });
});

const viewAllBookingsByAdmin: RequestHandler = catchAsync(async (req, res) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) {
    throw new AppError(httpStatus.UNAUTHORIZED, "You are not authorized!");
  }

  const result = await BookingService.viewAllBookingsByAdmin(req.query);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Bookings retrieved successfully",
    data: result,
  });
});

const viewBookingsByUser: RequestHandler = catchAsync(async (req, res) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) {
    throw new AppError(httpStatus.UNAUTHORIZED, "You are not authorized!");
  }

  const id = getUserIdFromToken(req);
  const result = await BookingService.viewBookingsByUser(id, req.query);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Bookings retrieved successfully",
    data: result,
  });
});

const viewBookingById: RequestHandler = catchAsync(async (req, res) => {
  const { id } = req.params;
  const token = req.headers.authorization?.split(" ")[1];
  if(!token){
    throw new AppError(httpStatus.UNAUTHORIZED, "You are not authorized!");
  }

  const result = await BookingService.getBookingsById(id);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Booking Data retrieved successfully.",
    data: result,
  });
})

const cancleBookingByUser: RequestHandler = catchAsync(async (req, res) => {
  const { id } = req.params;
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) {
    throw new AppError(httpStatus.UNAUTHORIZED, "You are not authorized!");
  }

  const result = await BookingService.cancelBookingByUser(id);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Booking cancelled successfully",
    data: result,
  });
});

export const BookingControllers = {
  createBooking,
  viewAllBookingsByAdmin,
  viewBookingsByUser,
  viewBookingById,
  cancleBookingByUser,
};
