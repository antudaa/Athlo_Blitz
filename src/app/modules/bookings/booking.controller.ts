import { RequestHandler } from "express";
import catchAsync from "../../utils/catchAsync";
import { BookingService } from "./bookings.service";
import sendResponse from "../../utils/sendResponse";
import httpStatus from "http-status";
import noDataFound from "../../middlewares/noDataFound";


const createBooking: RequestHandler = catchAsync(async (req, res) => {
    const bookingInfo = { ...req.body, user: req.user.userId };
    const result = await BookingService.createBookingIntoDB(bookingInfo);

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Booking created successfully',
        data: result,
    });
});

const viewAllBookingsByAdmin: RequestHandler = catchAsync(async (req, res) => {
    const result = await BookingService.viewAllBookingsByAdmin();

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Bookings retrieved successfully',
        data: result,
    })
});

const viewBookingsByUser: RequestHandler = catchAsync(async (req, res) => {
    const result = await BookingService.viewBookingsByUser(req.user.userId);

    if (result.length === 0) {
        return noDataFound(res);
    }
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Bookings retrieved successfully',
        data: result,
    })
});

const cancleBookingByUser: RequestHandler = catchAsync(async (req, res) => {
    const { bookingId } = req.params;
    const result = await BookingService.cancelBookingByUser(bookingId);

    
})

export const BookingControllers = {
    createBooking,
    viewAllBookingsByAdmin,
    viewBookingsByUser,
}