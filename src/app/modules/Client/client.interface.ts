import { Model, Types } from "mongoose";

export interface TClient {
  user: Types.ObjectId;
  name: string;
  email: string;
  phone: string;
  profileImage?: string;
  address: string;
}

export interface ClientModel extends Model<TClient> {};