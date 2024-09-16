import mongoose, { Schema, model } from "mongoose";
import { BookingModel, IBooking } from "./bookings.interface";
import { Facility } from "../facilities/facilities.model";
import AppError from "../../Errors/AppError";

const bookingSchema = new Schema<IBooking, BookingModel>(
  {
    facility: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "Facility",
    },
    date: {
      type: String,
      required: true,
    },
    startTime: {
      type: String,
      required: true,
    },
    endTime: {
      type: String,
      required: true,
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    paymentStatus: {
      type: String,
      enum: {
        values: ['pending', 'successfull', 'failed']
      },
      default: 'pending',
    },
    transactionId: {
      type: String,
    },
    payableAmount: {
      type: Number,
    },
    isBooked: {
      type: String,
      enum: {
        values: ["confirmed", "pending", "canceled"],
      },
      default: "pending",
    },
    isDeleted: {
      type: Boolean,
      default: false,
    }
  },
  { versionKey: false },
);

bookingSchema.pre("save", async function (next) {
  const booking = this;
  const facility = await Facility.findById(booking.facility);

  if (!facility) {
    throw new AppError(400, "Facility not found!");
  }

  const payableAmount = Booking.calculatePayableAmount(
    booking.startTime,
    booking.endTime,
    facility.pricePerHour
  );

  booking.payableAmount = payableAmount;
  booking.isBooked = "confirmed";
  next();
});

bookingSchema.statics.isBookingExists = async function (
  bookingInfo: Partial<IBooking>,
  session: mongoose.ClientSession | null = null
) {
  const query = this.findOne({
    facility: bookingInfo.facility,
    date: bookingInfo.date,
    $or: [
      {
        startTime: { $lt: bookingInfo.endTime },
        endTime: { $gt: bookingInfo.startTime },
      },
    ],
  });

  if (session) {
    query.session(session);
  }

  const existingBooking = await query.exec();
  return !!existingBooking;
};

bookingSchema.statics.calculatePayableAmount = function (
  startTime: string,
  endTime: string,
  pricePerHour: number
): number {
  const start = new Date(`1970-01-01T${startTime}:00Z`);
  const end = new Date(`1970-01-01T${endTime}:00Z`);
  const durationInMilliseconds = end.getTime() - start.getTime();
  const durationInHours = durationInMilliseconds / (1000 * 60 * 60);

  return durationInHours * pricePerHour;
};

export const Booking = model<IBooking, BookingModel>("Booking", bookingSchema);
