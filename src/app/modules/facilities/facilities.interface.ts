import { Model, Types } from "mongoose";

export type TFacility = {
  user: Types.ObjectId;
  name: string;
  description: string;
  pricePerHour: number;
  images: string[];
  facilityImages: string[];
  location: string;
  rating: number;
  isDeleted: boolean;
};

export interface FacilityModel extends Model<TFacility> {
  isFacilityDeleted(id: Types.ObjectId): Promise<Types.ObjectId>;
  isFacilityExists(id: Types.ObjectId, session?: any): Promise<boolean>;
};