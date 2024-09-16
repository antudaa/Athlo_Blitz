import mongoose, { Model, Types } from "mongoose";

export interface IBooking {
  facility: Types.ObjectId;
  date: string;
  startTime: string;
  endTime: string;
  user?: Types.ObjectId;
  paymentStatus: 'pending' | 'successfull' | 'failed';
  transactionId: string;
  payableAmount?: number;
  isBooked?: "confirmed" | "pending" | "canceled";
  isDeleted: boolean;
}

export interface BookingModel extends Model<IBooking> {
  calculatePayableAmount(startTime: string, endTime: string, pricePerHour: number): number;
  isBookingExists(bookingInfo: IBooking, session?: mongoose.ClientSession): Promise<boolean>;
}
