import { Schema, model } from "mongoose";
import { TFacility } from "./facilities.interface";


const facilitySchema = new Schema<TFacility>(
    {
        name: {
            type: String,
            required: true,
            unique: true,
        },
        description: {
            type: String,
            required: true,
        },
        pricePerHour: {
            type: Number,
            required: true,
        },
        location: {
            type: String,
            required: true,
        },
        isDeleted: {
            type: Boolean,
            default: false,
        }
    },
    {
        toJSON: {
            virtuals: true,
        }
    }
);


export const Facility = model<TFacility>('Facility', facilitySchema);