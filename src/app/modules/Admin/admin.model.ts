import { Schema, model } from "mongoose";
import { AdminModel, TAdmin } from "./admin.interface";

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
      type: String,
      required: [true, "Address is required!"],
    },
  },
  {
    versionKey: false,
  }
);

export const Admin = model<TAdmin, AdminModel>("Admin", adminSchema);