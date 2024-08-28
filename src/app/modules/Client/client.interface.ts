import { Model, Types } from "mongoose";

export interface TAddressClient {
  streetAddress: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
}

export interface TClient {
  user: Types.ObjectId;
  name: string;
  email: string;
  phone: string;
  profileImage?: string;
  address: TAddressClient;
}

export interface ClientModel extends Model<TClient> {};