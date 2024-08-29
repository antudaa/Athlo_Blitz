import { Schema, model } from "mongoose";
import { ITimeSlot, TimeSlotModel } from "./timeSlot.interface";
import { IBooking } from "../bookings/bookings.interface";

const timeSlotSchema = new Schema<ITimeSlot, TimeSlotModel>({
  facility: {
    type: Schema.Types.ObjectId,
    required: [true, "Start time is required!"],
    ref: "Facility"
  },
  date: {
    type: Date,
    required: [true, "End time is required!"],
  },
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

timeSlotSchema.statics.isTimeSlotAvailable = async function (
  bookedTimeSlots: IBooking[]
): Promise<IBooking[]> {
  const availableSlots: IBooking[] = [];

  // Define the start and end of the day
  const dayStart = new Date("1970-01-01T00:00:00Z");
  const dayEnd = new Date("1970-01-01T23:59:59Z");

  // Convert booked time slots to Date objects for proper comparison
  const formattedBookedSlots = bookedTimeSlots.map((slot) => ({
    start: new Date(`1970-01-01T${slot.startTime}:00Z`),
    end: new Date(`1970-01-01T${slot.endTime}:00Z`),
  }));

  // Sort booked slots by start time
  formattedBookedSlots.sort((a, b) => a.start.getTime() - b.start.getTime());

  let previousEnd = dayStart;

  for (const booked of formattedBookedSlots) {
    if (previousEnd < booked.start) {
      availableSlots.push({
        facility: bookedTimeSlots[0].facility,
        date: bookedTimeSlots[0].date,
        startTime: previousEnd.toISOString().substring(11, 16),
        endTime: booked.start.toISOString().substring(11, 16),
      });
    }

    // Update previousEnd to the end of the current booked slot
    previousEnd = booked.end;
  }

  // Check for availability from the end of the last booked slot to the end of the day
  if (previousEnd < dayEnd) {
    availableSlots.push({
      facility: bookedTimeSlots[0].facility,
      date: bookedTimeSlots[0].date,
      startTime: previousEnd.toISOString().substring(11, 16),
      endTime: dayEnd.toISOString().substring(11, 16),
    });
  }

  return availableSlots;
};

export const TimeSlot = model<ITimeSlot, TimeSlotModel>("slotTime", timeSlotSchema);
