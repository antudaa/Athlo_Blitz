import { Schema, Types, model } from "mongoose";
import { FacilityModel, TFacility } from "./facilities.interface";

const facilitySchema = new Schema<TFacility, FacilityModel>(
  {
    user: {
      type: Schema.Types.ObjectId,
      required: true,
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
    images: {
      type: [String],
      required: [true, 'Facility image is required!'],
    },
    location: {
      type: String,
      required: [true, 'Location is required!'],
    },
    rating: {
      type: Number,
      default: 0,
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

facilitySchema.statics.isFacilityExists = async function (
  facilityId: Types.ObjectId,
) {
  const query = this.findOne({ _id: facilityId, isDeleted: false });

  const facility = await query.exec();
  return !!facility; // Return true if facility exists
};

facilitySchema.statics.isFacilityDeleted = async function (id: Types.ObjectId) {
  const existingFacility = await Facility.findById(id);

  return existingFacility?.isDeleted === true;
};

export const Facility = model<TFacility, FacilityModel>(
  "Facility",
  facilitySchema,
);
