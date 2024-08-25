import { Model, Types } from "mongoose";
import { USER_ROLE } from "./user.constant";

export interface IUser {
  _id?: Types.ObjectId;
  name: string;
  email: string;
  password: string;
  passwordChangedAt?: Date;
  phone: string;
  role: "user" | "admin";
  status: "active" | "blocked";
  address: string;
  isDeleted: boolean;
}

export interface UserModel extends Model<IUser> {

  hashPassword(password: string): Promise<string>;

  isUserBlocked(status: string): Promise<string>;

  isUserExistsByEmail(email: string): Promise<IUser>;

  isUserDeleted(email: string): Promise<IUser>;

  isJWTIssuedBeforePasswordChanged(passwordChangeTimeStamp: Date, jwtIssuedTimeStamp: number): Promise<boolean>;

  isPasswordMatched(
    plainPassword: string,
    hashedPassword: string,
  ): Promise<boolean>;
}

export type TUserRole = keyof typeof USER_ROLE;
