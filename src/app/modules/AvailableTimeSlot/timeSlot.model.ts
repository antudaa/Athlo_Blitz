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
  date: string
): Promise<{ oneHourSlots: IBooking[]; twoHourSlots: IBooking[] }> {
  const oneHourSlots: IBooking[] = [];
  const twoHourSlots: IBooking[] = [];

  // Define the start and end of the day
  const dayStart = new Date("1970-01-01T00:00:00Z");
  const dayEnd = new Date("1970-01-01T23:59:59Z");

  // Utility function to format time with AM/PM
  const formatTimeWithAmPm = (date: Date) => {
    let hours = date.getUTCHours();
    const minutes = date.getUTCMinutes();
    const ampm = hours >= 12 ? "PM" : "AM";
    hours = hours % 12;
    hours = hours ? hours : 12; // Hour '0' should be '12'
    const minutesStr = minutes < 10 ? `0${minutes}` : minutes;
    return `${hours}:${minutesStr} ${ampm}`;
  };

  // Generate all 1-hour and 2-hour slots for the entire day
  const allOneHourSlots: IBooking[] = [];
  const allTwoHourSlots: IBooking[] = [];

  for (let hour = 0; hour < 24; hour++) {
    // Create 1-hour slots
    const start1Hour = new Date(dayStart.getTime() + hour * 60 * 60 * 1000);
    const end1Hour = new Date(start1Hour.getTime() + 60 * 60 * 1000);
    allOneHourSlots.push({
      facility: facilityId,
      date: date,
      startTime: formatTimeWithAmPm(start1Hour),
      endTime: formatTimeWithAmPm(end1Hour),
      paymentStatus: "pending",
      transactionId: "",
      isBooked: "pending",
      isDeleted: false,
    });

    // Create 2-hour slots
    const start2Hour = new Date(dayStart.getTime() + hour * 60 * 60 * 1000);
    const end2Hour = new Date(start2Hour.getTime() + 2 * 60 * 60 * 1000);
    if (end2Hour.getTime() <= dayEnd.getTime()) {
      allTwoHourSlots.push({
        facility: facilityId,
        date: date,
        startTime: formatTimeWithAmPm(start2Hour),
        endTime: formatTimeWithAmPm(end2Hour),
        paymentStatus: "pending",
        transactionId: "",
        isBooked: "pending",
        isDeleted: false,
      });
    }
  }

  // Convert booked time slots into Date objects for comparison
  const formattedBookedSlots = bookedTimeSlots.map((slot) => ({
    start: new Date(`1970-01-01T${slot.startTime.split(" ")[0]}:00Z`),
    end: new Date(`1970-01-01T${slot.endTime.split(" ")[0]}:00Z`),
    isBooked: slot.isBooked,
  }));

  // Filter 1-hour slots to exclude overlapping slots
  for (const slot of allOneHourSlots) {
    const slotStart = new Date(`1970-01-01T${slot.startTime.split(" ")[0]}:00Z`);
    const slotEnd = new Date(`1970-01-01T${slot.endTime.split(" ")[0]}:00Z`);

    let isAvailable = true;

    for (const booked of formattedBookedSlots) {
      // Check if the slot overlaps with a booked slot and is not canceled
      if (
        booked.isBooked !== "canceled" &&
        ((slotStart >= booked.start && slotStart < booked.end) || // Slot start overlaps
          (slotEnd > booked.start && slotEnd <= booked.end) || // Slot end overlaps
          (slotStart <= booked.start && slotEnd >= booked.end)) // Slot fully covers a booked slot
      ) {
        isAvailable = false;
        break;
      }
    }

    // Add the slot to oneHourSlots if it is available
    if (isAvailable) {
      oneHourSlots.push(slot);
    }
  }

  // Filter 2-hour slots to exclude overlapping slots
  for (const slot of allTwoHourSlots) {
    const slotStart = new Date(`1970-01-01T${slot.startTime.split(" ")[0]}:00Z`);
    const slotEnd = new Date(`1970-01-01T${slot.endTime.split(" ")[0]}:00Z`);

    let isAvailable = true;

    for (const booked of formattedBookedSlots) {
      // Check if the slot overlaps with a booked slot and is not canceled
      if (
        booked.isBooked !== "canceled" &&
        ((slotStart >= booked.start && slotStart < booked.end) || // Slot start overlaps
          (slotEnd > booked.start && slotEnd <= booked.end) || // Slot end overlaps
          (slotStart <= booked.start && slotEnd >= booked.end)) // Slot fully covers a booked slot
      ) {
        isAvailable = false;
        break;
      }
    }

    // Add the slot to twoHourSlots if it is available
    if (isAvailable) {
      twoHourSlots.push(slot);
    }
  }

  // Return both 1-hour and 2-hour slots
  return { oneHourSlots, twoHourSlots };
};




export const TimeSlot = model<ITimeSlot, TimeSlotModel>("slotTime", timeSlotSchema);
