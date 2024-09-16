import { Schema, Types, model } from "mongoose";
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
  bookedTimeSlots: IBooking[],
  facilityId: Types.ObjectId,
  date: string,
): Promise<IBooking[]> {
  const availableSlots: IBooking[] = [];

  // Define the start and end of the day
  const dayStart = new Date("1970-01-01T00:00:00Z");
  const dayEnd = new Date("1970-01-01T23:59:59Z");

  // Convert booked time slots to Date objects for proper comparison and include canceled slots as available
  const formattedBookedSlots = bookedTimeSlots
    .map((slot) => ({
      start: new Date(`1970-01-01T${slot.startTime}:00Z`),
      end: new Date(`1970-01-01T${slot.endTime}:00Z`),
      isBooked: slot.isBooked,
    }));

  // Sort booked slots by start time
  formattedBookedSlots.sort((a, b) => a.start.getTime() - b.start.getTime());

  // Utility function to format time with AM/PM
  const formatTimeWithAmPm = (date: Date) => {
    let hours = date.getUTCHours();
    const minutes = date.getUTCMinutes();
    const ampm = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12;
    hours = hours ? hours : 12; // Hour '0' should be '12'
    const minutesStr = minutes < 10 ? `0${minutes}` : minutes;
    return `${hours}:${minutesStr} ${ampm}`;
  };

  // If no bookings exist for the day or if all bookings are canceled, create two default time slots
  if (formattedBookedSlots.length === 0 || formattedBookedSlots.every(slot => slot.isBooked === "canceled")) {
    return [
      {
        facility: facilityId,
        date: date,
        startTime: formatTimeWithAmPm(dayStart),
        endTime: formatTimeWithAmPm(new Date(dayStart.getTime() + 12 * 60 * 60 * 1000)),
        paymentStatus: 'pending',
        transactionId: '',
        isBooked: "pending", // Default to pending for new slots
        isDeleted: false,
      },
      {
        facility: facilityId,
        date: date,
        startTime: formatTimeWithAmPm(new Date(dayStart.getTime() + 12 * 60 * 60 * 1000)),
        endTime: formatTimeWithAmPm(dayEnd),
        paymentStatus: 'pending',
        transactionId: '',
        isBooked: "pending", // Default to pending for new slots
        isDeleted: false,
      },
    ];
  }

  let previousEnd = dayStart;

  for (const booked of formattedBookedSlots) {
    // If the previous end time is less than the current booking start, there is an available slot
    if (previousEnd < booked.start) {
      availableSlots.push({
        facility: facilityId,
        date: date,
        startTime: formatTimeWithAmPm(previousEnd),
        endTime: formatTimeWithAmPm(booked.start),
        paymentStatus: 'pending',
        transactionId: '',
        isBooked: "pending", // Mark the slot as available
        isDeleted: false,
      });
    }

    // If this booking is canceled, consider it as available time
    if (booked.isBooked === "canceled") {
      availableSlots.push({
        facility: facilityId,
        date: date,
        startTime: formatTimeWithAmPm(booked.start),
        endTime: formatTimeWithAmPm(booked.end),
        paymentStatus: 'pending',
        transactionId: '',
        isBooked: "pending", // Mark the slot as available
        isDeleted: false,
      });
    }

    // Move the previous end to the end of the current slot
    previousEnd = booked.end > previousEnd ? booked.end : previousEnd;
  }

  // If there is still time remaining after the last booking, add it as an available slot
  if (previousEnd < dayEnd) {
    availableSlots.push({
      facility: facilityId,
      date: date,
      startTime: formatTimeWithAmPm(previousEnd),
      endTime: formatTimeWithAmPm(dayEnd),
      paymentStatus: 'pending',
      transactionId: '',
      isBooked: "pending", // Mark the slot as available
      isDeleted: false,
    });
  }

  return availableSlots;
};



export const TimeSlot = model<ITimeSlot, TimeSlotModel>("slotTime", timeSlotSchema);
