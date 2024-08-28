import { Types, Model } from "mongoose";

// Define the interface for a single user review
export interface TUserReview {
  user: Types.ObjectId;
  facility: Types.ObjectId;
  rating: number;
  title?: string;
  comment: string;
  createdAt?: Date;
  updatedAt?: Date;
  isDeleted: boolean;
}

// Define the interface for the user review model
export interface UserReviewModel extends Model<TUserReview> {

}