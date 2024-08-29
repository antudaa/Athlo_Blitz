import { Schema, model } from "mongoose";
import { FacilityModel, TFacility } from "./facilities.interface";

const facilitySchema = new Schema<TFacility, FacilityModel>(
  {
    user: {
      type: Schema.Types.ObjectId,
      reqired: true,
      ref: "User",
    },
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
      required: [true, 'Location is required!'],
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
  },
  {
    versionKey: false,
  },
);

facilitySchema.statics.isFacilityDeleted = async function (id: string) {
  const existingFacility = await Facility.findById(id);

  return existingFacility?.isDeleted === true;
};

export const Facility = model<TFacility, FacilityModel>(
  "Facility",
  facilitySchema,
);
