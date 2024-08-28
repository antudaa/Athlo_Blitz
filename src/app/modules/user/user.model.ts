import { Schema, model } from "mongoose";
import { TUser, UserModel } from "./user.interface";
import bcrypt from "bcrypt";
import config from "../../config";
import { UserStatus } from "./user.constant";

const userSchema = new Schema<TUser>(
  {
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    passwordChangedAt: {
      type: Date,
      default: new Date(),
    },
    role: {
      type: String,
      enum: ["user", "admin"],
      default: "user",
    },
    status: {
      type: String,
      enum: UserStatus,
      default: 'active',
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


userSchema.pre("save", async function (next) {
  const user = this;
  user.password = await bcrypt.hash(
    user.password,
    Number(config.bcrypt_salt_rounds),
  );
  next();
});

userSchema.set("toJSON", {
  transform: (doc, ret) => {
    delete ret.password;
    return ret;
  },
});

userSchema.statics.hashPassword = async function (password: string) {
  const hashedPassword = await bcrypt.hash(
    password,
    Number(config.bcrypt_salt_rounds),
  );

  return hashedPassword;
}

userSchema.statics.isUserExistsByEmail = async function (email: string) {
  return await User.findOne({ email });
};

userSchema.statics.isUserExistsByID = async function (id: string) {
  return await User.findById(id); 
};

userSchema.statics.blockUserByID = async function (id: Schema.Types.ObjectId) {
  return await User.findByIdAndUpdate(
    id,
    { status: 'blocked' },
    { new: true },
  );
};

userSchema.statics.isUserBlocked = async function (id: Schema.Types.ObjectId) {
  const user = await this.findById(id);
  return user && user.status === 'blocked';
}

userSchema.statics.deleteUserByID = async function (id: Schema.Types.ObjectId) {
  return await User.findByIdAndUpdate(
    id,
    { isDeleted: true },
    { new: true },
  );
};

userSchema.statics.isUserDeleted = async function (id: Schema.Types.ObjectId) {
  const user = await this.findById(id);
  return user && user.isDeleted === true;
};

userSchema.statics.isJWTIssuedBeforePasswordChanged = async function (
  passwordChangeTimeStamp: Date, jwtIssuedTimeStamp: number
) {
  const passwordChangeTime = new Date(passwordChangeTimeStamp).getTime() / 1000;

  return passwordChangeTime > jwtIssuedTimeStamp;
}

userSchema.statics.isPasswordMatched = async function (
  plainPassword,
  hashedPassword,
) {
  return await bcrypt.compare(plainPassword, hashedPassword);
};

export const User = model<TUser, UserModel>("User", userSchema);
