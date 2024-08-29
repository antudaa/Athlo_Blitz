import QueryBuilder from "../../builder/QueryBuilder";
import { Booking } from "../bookings/bookings.model";
import { TimeSlot } from "./timeSlot.model";

const getAvailableTimeSlot = async (query: Record<string, unknown>) => {
  const checkAvailabilityQuery = new QueryBuilder(Booking.find(), query)
    .filter()

  const [bookedslots] = await Promise.all([
    checkAvailabilityQuery.modelQuery.populate("user"),
    checkAvailabilityQuery.getTotalCount(),
  ]);

  const availableSlots = await TimeSlot.isTimeSlotAvailable(bookedslots);

  return availableSlots;
};

export const TimeSlotService = {
  getAvailableTimeSlot,
};
