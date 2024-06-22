import { Model, Types } from "mongoose";

export interface IBooking {
  facility: Types.ObjectId;
  date: string;
  startTime: string;
  endTime: string;
  user?: Types.ObjectId;
  payableAmount?: number;
  isBooked?: "confirmed" | "unconfirmed" | "canceled";
}

export interface BookingModel extends Model<IBooking> {
  calculatePayableAmount(
    startTime: string,
    endTime: string,
    pricePerhour: number,
  ): Promise<IBooking>;

  isBookingExists(bookingInfo: IBooking): Promise<boolean>;
}
