import { Model } from "mongoose";
import { IBooking } from "../bookings/bookings.interface";

export interface ITimeSlot {
  startTime: string;
  endTime: string;
};

export interface TimeSlotModel extends Model<ITimeSlot> {

  isTimeSlotAvailable(bookedTimeSlots: IBooking[]): Promise<IBooking[]>;
  getBookedTimeSlotsByDate(date?: string): Promise<IBooking[]>;
}