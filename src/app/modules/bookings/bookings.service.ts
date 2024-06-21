import httpStatus from "http-status";
import AppError from "../../Errors/AppError";
import { IBooking } from "./bookings.interface";
import { Booking } from "./bookings.model";
import { Facility } from "../facilities/facilities.model";
import { Types } from "mongoose";


const createBookingIntoDB = async (payload: IBooking,) => {

    const isFacilityExists = await Facility.isFacilityDeleted(payload?.facility as Types.ObjectId);

    if (isFacilityExists) {
        throw new AppError(httpStatus.BAD_REQUEST, 'Facility not exists!');
    }

    const bookingExists = await Booking.isBookingExists(payload);

    if (bookingExists) {
        throw new AppError(httpStatus.BAD_REQUEST, 'This slot is not available right now!');
    }

    const result = await Booking.create(payload);
    return result;
};

const viewAllBookingsByAdmin = async () => {
    const result = await Booking.find()
        .populate('user')
        .populate('facility')
        ;
    return result;
};

const viewBookingsByUser = async (id: string) => {
    const result = await Booking.find({
        user: id
    });
    return result;
}

export const BookingService = {
    createBookingIntoDB,
    viewAllBookingsByAdmin,
    viewBookingsByUser,
}