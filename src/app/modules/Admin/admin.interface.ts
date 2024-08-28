import { Model, Types } from "mongoose";

export type TAddressAdmin = {
  streetAddress: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
};

export type TAdmin = {
  user: Types.ObjectId;
  name: string;
  email?: string;
  phone: string;
  profileImage?: string;
  address: TAddressAdmin;
};

export interface AdminModel extends Model<TAdmin> { };
