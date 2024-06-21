import { Schema, Types, model } from "mongoose";
import { FacilityModel, IFacility } from "./facilities.interface";


const facilitySchema = new Schema<IFacility, FacilityModel>(
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
        versionKey: false,
    }
);

facilitySchema.statics.isFacilityDeleted = async function (id: Types.ObjectId) {
    const existingFacility = await Facility.findById(id);

    if (existingFacility?.isDeleted === true) {
        return true;
    }
    return false;
};


export const Facility = model<IFacility, FacilityModel>('Facility', facilitySchema);