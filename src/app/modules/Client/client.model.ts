import { Schema, model } from "mongoose";
import { ClientModel, TAddressClient, TClient } from "./client.interface";
// import bcrypt from "bcrypt";
// import config from "../../config";
// import { AdminModel, IAddress, IAdmin } from "./admin.interface";
// import { AdminStatus } from "./admin.constant";

// Define the address schema
const addressSchema = new Schema<TAddressClient>(
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
const clientSchema = new Schema<TClient>(
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

// adminSchema.pre("save", async function (next) {
//   const admin = this;
//   admin.password = await bcrypt.hash(
//     admin.password,
//     Number(config.bcrypt_salt_rounds),
//   );
//   next();
// });

// adminSchema.set("toJSON", {
//   transform: (doc, ret) => {
//     delete ret.password;
//     return ret;
//   },
// });

// adminSchema.statics.hashPassword = async function (password: string) {
//   const hashedPassword = await bcrypt.hash(
//     password,
//     Number(config.bcrypt_salt_rounds),
//   );

//   return hashedPassword;
// }

// adminSchema.statics.isUserExistsByEmail = async function (email: string) {
//   return await Admin.findOne({ email });
// };

// adminSchema.statics.isUserDeleted = async function (email: string) {
//   return await Admin.findOne({ email });
// };

// adminSchema.statics.isJWTIssuedBeforePasswordChanged = async function (
//   passwordChangeTimeStamp: Date, jwtIssuedTimeStamp: number
// ) {
//   const passwordChangeTime = new Date(passwordChangeTimeStamp).getTime() / 1000;

//   return passwordChangeTime > jwtIssuedTimeStamp;
// }

// adminSchema.statics.isPasswordMatched = async function (
//   plainPassword,
//   hashedPassword,
// ) {
//   return await bcrypt.compare(plainPassword, hashedPassword);
// };

export const Client = model<TClient, ClientModel>("Client", clientSchema);