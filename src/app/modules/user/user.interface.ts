import { Model, Types } from "mongoose";
import { USER_ROLE } from "./user.constant";

export interface IUser {
    _id?: Types.ObjectId,
    name: string;
    email: string;
    password: string;
    phone: string;
    role: 'user' | 'admin';
    address: string;
};


export interface UserModel extends Model<IUser> {

    isUserExistsByEmail(email: string): Promise<IUser>,

    isUserDeleted(email: string): Promise<IUser>,

    isPasswordMatched(plainPassword: string, hashedPassword: string): Promise<boolean>,
}

export type TUserRole = keyof typeof USER_ROLE;