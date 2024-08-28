import { Schema, model } from "mongoose";
import { AdminModel, TAddressAdmin, TAdmin } from "./admin.interface";

// Define the address schema
const addressSchema = new Schema<TAddressAdmin>(
  {
    streetAddress: {
      type: String,
      required: [true, "Street address is required!"],
    },
    city: {
      type: String,
      required: [true, "City is required!"],
    },
    state: {
      type: String,
      required: [true, "State is required!"],
    },
    postalCode: {
      type: String,
      required: [true, "Postal code is required!"],
    },
    country: {
      type: String,
      required: [true, "Country is required!"],
    },
  },
  {
    _id: false,
  }
);

// Define the admin schema
const adminSchema = new Schema<TAdmin>(
  {
    user: {
      type: Schema.Types.ObjectId,
      required: [true, "Name is required!"],
      unique: true,
      ref: 'User'
    },
    name: {
      type: String,
      required: [true, "Name is required!"],
    },
    email: {
      type: String,
      required: [true, "Email is required!"],
      unique: true,
    },
    phone: {
      type: String,
      required: [true, "Phone number is required!"],
    },
    profileImage: {
      type: String,
      default: 'https://cdn-icons-png.flaticon.com/128/1077/1077012.png'
    },
    address: {
      type: addressSchema,
      required: [true, "Address is required!"],
    },
  },
  {
    versionKey: false,
  }
);

export const Admin = model<TAdmin, AdminModel>("Admin", adminSchema);