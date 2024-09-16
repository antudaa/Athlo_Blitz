import { Model, Types } from "mongoose";

export type TAdmin = {
  user: Types.ObjectId;
  name: string;
  email?: string;
  phone: string;
  profileImage?: string;
  address: string;
};

export interface AdminModel extends Model<TAdmin> { };