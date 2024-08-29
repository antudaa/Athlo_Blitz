import { Model, Types } from "mongoose";

export type TFacility = {
  user: Types.ObjectId;
  name: string;
  description: string;
  pricePerHour: number;
  location: string;
  isDeleted: boolean;
};

export interface FacilityModel extends Model<TFacility> {
  isFacilityDeleted(id: Types.ObjectId): Promise<Types.ObjectId>;
  isFacilityExists(id: string): Promise<string>;
};