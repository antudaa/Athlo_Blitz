import { Schema, model } from "mongoose";
import { ITimeSlot, TimeSlotModel } from "./timeSlot.interface";
import { Booking } from "../bookings/bookings.model";
import { IBooking } from "../bookings/bookings.interface";

const timeSlotSchema = new Schema<ITimeSlot, TimeSlotModel>({
  startTime: {
    type: String,
    required: [true, "Start time is required!"],
    unique: true,
  },
  endTime: {
    type: String,
    required: [true, "End time is required!"],
    unique: true,
  },
});

timeSlotSchema.statics.isTimeSlotAvailable = async function (bookedTimeSlots: IBooking[]) {

  const allTimeSlots: ITimeSlot[] = [];
  for (let hour = 0; hour < 24; hour += 2) {
    const startTime = `${hour.toString().padStart(2, '0')}:00`;
    const endTime = `${(hour + 2).toString().padStart(2, '0')}:00`;
    allTimeSlots.push({ startTime, endTime });
  }

  const availableTimeSlots = allTimeSlots.filter(slot => {
    return !bookedTimeSlots.some(booking => {
      const bookingStart = new Date(`1970-01-01T${booking.startTime}:00Z`).getTime();
      const bookingEnd = new Date(`1970-01-01T${booking.endTime}:00Z`).getTime();
      const slotStart = new Date(`1970-01-01T${slot.startTime}:00Z`).getTime();
      const slotEnd = new Date(`1970-01-01T${slot.endTime}:00Z`).getTime();
      return (
        (slotStart >= bookingStart && slotStart < bookingEnd) ||
        (slotEnd > bookingStart && slotEnd <= bookingEnd) ||
        (slotStart <= bookingStart && slotEnd >= bookingEnd)
      );
    });
  });

  return availableTimeSlots;
}

timeSlotSchema.statics.getBookedTimeSlotsByDate = async function (date?: string): Promise<IBooking[]> {
  const queryDate = date || new Date().toISOString().split('T')[0];
  const bookedTimeSlots = await Booking.find({
    date: queryDate
  });
  return bookedTimeSlots;
};

export const TimeSlot = model<ITimeSlot, TimeSlotModel>("slotTime", timeSlotSchema);
