import { Schema, model } from "mongoose";
import { TBooking } from "./bookings.interface";


const bookingSchema = new Schema<TBooking>(
    {
        date: {
            type: Date,
            required: true,
        },
        startTime: {
            type: String,
            required: true,
        },
        endTime: {
            type: String,
            required: true,
        },
        user: {
            type: Schema.Types.ObjectId,
            required: true,
            ref: 'User',
        },
        facility: {
            type: Schema.Types.ObjectId,
            required: true,
            ref: 'Facility',
        },
        payableAmount: {
            type: Number,
        },
        isBooked: {
            type: String,
            enum: {
                values: ['confirmed', 'unconfirmed', 'canceled']
            },
            default: 'unconfirmed'
        }
    },
    {
        toJSON: {
            virtuals: true,
        }
    }
);

export const Booking = model<TBooking>('Booking', bookingSchema);