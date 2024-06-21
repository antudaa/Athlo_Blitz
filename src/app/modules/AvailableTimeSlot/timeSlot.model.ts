import { Schema, model } from "mongoose";
import { TTimeSlot } from "./timeSlot.interface";


const slotTimeSchema = new Schema<TTimeSlot>(
    {
        startTime: {
            type: String,
            required: [true, 'Start time is required!'],
            unique: true,
        },
        endTime: {
            type: String,
            required: [true, 'End time is required!'],
            unique: true,
        },
    }
);

export const TimeSlot = model<TTimeSlot>('slotTime', slotTimeSchema);