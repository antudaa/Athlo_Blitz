import { Model, Types } from "mongoose";
import { IBooking } from "../bookings/bookings.interface";

export interface ITimeSlot {
  facility: Types.ObjectId;
  date: Date;
  startTime: string;
  endTime: string;
};

export interface TimeSlotModel extends Model<ITimeSlot> {
  isTimeSlotAvailable(bookedTimeSlots: IBooking[]): Promise<IBooking[]>;
}