import httpStatus from "http-status";
import AppError from "../../Errors/AppError";
import { IBooking } from "./bookings.interface";
import { Booking } from "./bookings.model";
import { Facility } from "../facilities/facilities.model";
import mongoose, { Types } from "mongoose";
import { initiatePayment } from "../payment/payment.utils";
import { Client } from "../Client/client.model";
import QueryBuilder from "../../builder/QueryBuilder";

const createBookingIntoDB = async (payload: IBooking) => {
    const { facility, date, startTime, endTime, user } = payload;
    const session = await mongoose.startSession();

    try {
        session.startTransaction();

        const isFacilityExists = await Facility.isFacilityExists(
            payload?.facility as Types.ObjectId
        );

        if (!isFacilityExists) {
            throw new AppError(httpStatus.BAD_REQUEST, 'Facility does not exist!');
        }

        const bookingExists = await Booking.isBookingExists(payload, session); // Pass session correctly

        if (bookingExists) {
            throw new AppError(
                httpStatus.BAD_REQUEST,
                'This slot is not available right now!',
            );
        }

        const userDetails = await Client.findOne({
            user: user
        });

        if (!userDetails) {
            throw new AppError(httpStatus.BAD_REQUEST, 'Facility not found!');
        }

        const facilityDetails = await Facility.findById(facility);

        if (!facilityDetails) {
            throw new AppError(httpStatus.BAD_REQUEST, 'Facility not found!');
        }

        const payableAmount = Booking.calculatePayableAmount(
            startTime,
            endTime,
            facilityDetails.pricePerHour
        );

        const transactionId = `TXN-${Date.now()}`;

        const booking = new Booking({
            facility,
            date,
            startTime,
            endTime,
            user,
            paymentStatus: 'pending',
            isBooked: 'pending',
            transactionId: transactionId,
            payableAmount
        });

        await booking.save({ session });
        const paymentData = {
            transactionId,
            payableAmount,
            customerName: userDetails.name,
            customerEmail: userDetails.email,
            customerPhone: userDetails.phone,
            customerAddress: userDetails.address
        }

        const paymentSession = await initiatePayment(paymentData);

        await session.commitTransaction();
        return paymentSession;

    } catch (error) {
        await session.abortTransaction(); // Abort the transaction (rollback)
        throw new AppError(httpStatus.INTERNAL_SERVER_ERROR, 'Failed to create booking');
    } finally {
        session.endSession(); // End the session
    }
};


const viewAllBookingsByAdmin = async (query: Record<string, unknown>) => {
    const bookingQuery = new QueryBuilder(Booking.find(), query)
        .search(["user.name", "facility.name"])
        .filter()
        .sort()
        .paginate()
        .fields();

    const [bookings, totalCount] = await Promise.all([
        bookingQuery.modelQuery.populate("user").populate("facility"),
        bookingQuery.getTotalCount(),
    ]);

    return { total: totalCount, data: bookings };
};

const viewBookingsByUser = async (id: string, query: Record<string, unknown>) => {
    const bookingQuery = new QueryBuilder(Booking.find({ user: id }), query)
        .search(["facility.name"])
        .filter()
        .sort()
        .paginate()
        .fields();

    const [bookings, totalCount] = await Promise.all([
        bookingQuery.modelQuery.populate("facility"),
        bookingQuery.getTotalCount(),
    ]);

    return { total: totalCount, data: bookings };
};

const viewBookingsById = async (id: string) => {
    const result = await Booking.findById(id)
        .populate('facility')
        .populate('user');

    return result;
};

const cancelBookingByUser = async (id: string) => {
    const result = await Booking.findByIdAndUpdate(
        id,
        {
            isBooked: "canceled",
            paymentStatus: 'canceled',
        },
        { new: true },
    ).populate("facility");

    return result;
};

export const BookingService = {
    createBookingIntoDB,
    viewAllBookingsByAdmin,
    viewBookingsByUser,
    getBookingsById: viewBookingsById,
    cancelBookingByUser,
};
