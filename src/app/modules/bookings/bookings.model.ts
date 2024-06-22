import { Schema, model } from "mongoose";
import { BookingModel, IBooking } from "./bookings.interface";
import { Facility } from "../facilities/facilities.model";

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
    payableAmount: {
      type: Number,
    },
    isBooked: {
      type: String,
      enum: {
        values: ["confirmed", "unconfirmed", "canceled"],
      },
      default: "unconfirmed",
    },
  },
  { versionKey: false },
);

bookingSchema.pre("save", async function (next) {
  const booking = this;
  const facility = await Facility.findById(booking.facility);

  const payableAmount = Booking.calculatePayableAmount(
    booking.startTime,
    booking.endTime,
    facility?.pricePerHour as number,
  );

  booking.payableAmount = Number(payableAmount);
  booking.isBooked = "confirmed";

  next();
});

bookingSchema.statics.isBookingExists = async function (
  bookingInfo: Partial<IBooking>,
) {
  const existingBooking = await Booking.findOne({
    facility: bookingInfo.facility,
    date: bookingInfo.date,
    $or: [
      {
        startTime: { $lt: bookingInfo.endTime },
        endTime: { $gt: bookingInfo.startTime },
      },
    ],
  });

  return !!existingBooking;
};

bookingSchema.statics.calculatePayableAmount = function (
  startTime: string,
  endTime: string,
  pricePerHour: number,
): number {
  const start = new Date(`1970-01-01T${startTime}:00Z`);
  const end = new Date(`1970-01-01T${endTime}:00Z`);
  const durationInMilliseconds = end.getTime() - start.getTime();
  const durationInHours = durationInMilliseconds / (1000 * 60 * 60);

  const payableAmount = durationInHours * pricePerHour;
  return payableAmount;
};

export const Booking = model<IBooking, BookingModel>("Booking", bookingSchema);
