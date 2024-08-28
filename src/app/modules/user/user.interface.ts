import { Model, Types } from "mongoose";
import { USER_ROLE } from "./user.constant";

export interface TUser {
  _id?: string;
  onModel: 'Admin' | "Client";
  email: string;
  password: string;
  passwordChangedAt?: Date;
  role: "user" | "admin";
  status: "active" | "blocked";
  isDeleted: boolean;
}

export interface UserModel extends Model<TUser> {

  hashPassword(password: string): Promise<string>;

  blockUserByID(id: Types.ObjectId): Promise<Types.ObjectId>;

  deleteUserByID(id: Types.ObjectId): Promise<Types.ObjectId>;

  isUserBlocked(id: Types.ObjectId): Promise<Types.ObjectId>;

  isUserExistsByID(id: string): Promise<string>;

  isUserExistsByEmail(email: string): Promise<TUser>;

  isUserDeleted(id: Types.ObjectId): Promise<Types.ObjectId>;

  isJWTIssuedBeforePasswordChanged(passwordChangeTimeStamp: Date, jwtIssuedTimeStamp: number): Promise<boolean>;

  isPasswordMatched(
    plainPassword: string,
    hashedPassword: string,
  ): Promise<boolean>;
}

export type TUserRole = keyof typeof USER_ROLE;