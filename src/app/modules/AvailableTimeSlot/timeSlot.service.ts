import { IBooking } from "../bookings/bookings.interface";
import { TimeSlot } from "./timeSlot.model";

const getAvailableTimeSlot = async (date?: string) => {

  const bookedTimeSlots: IBooking[] = await TimeSlot.getBookedTimeSlotsByDate(date);
  const availableTimeSlots = await TimeSlot.isTimeSlotAvailable(bookedTimeSlots);

  return availableTimeSlots;
};

export const TimeSlotService = {
  getAvailableTimeSlot,
};
