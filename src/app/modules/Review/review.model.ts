import { Schema, model } from "mongoose"; // Make sure to adjust the import path accordingly
import { TUserReview, UserReviewModel } from "./review.interface";

const userReviewSchema = new Schema<TUserReview>(
    {
        user: {
            type: Schema.Types.ObjectId,
            ref: "User",
            required: true
        },
        facility: {
            type: Schema.Types.ObjectId,
            ref: "Facility",
            required: true
        },
        rating: {
            type: Number,
            required: true,
            min: 1,
            max: 5
        },
        title: {
            type: String
        },
        comment: {
            type: String,
            required: true
        },
        isDeleted: {
            type: Boolean,
            default: false,
        }
    },
    { timestamps: true }
);

// Creating the UserReview model
export const UserReview = model<TUserReview, UserReviewModel>("UserReview", userReviewSchema);