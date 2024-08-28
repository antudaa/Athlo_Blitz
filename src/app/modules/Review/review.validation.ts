import { z } from "zod";
import { Types } from "mongoose";

// Utility function to validate MongoDB ObjectId using Zod
const objectIdSchema = z.custom<Types.ObjectId>((val) => Types.ObjectId.isValid(val), {
    message: "Invalid ObjectId",
});

// Zod schema for validating user review input
export const userReviewSchema = z.object({
    user: objectIdSchema,
    facility: objectIdSchema,
    rating: z.number().min(1).max(5),
    title: z.string().optional(),
    comment: z.string().min(1),
});

export const UserReviewValidation = {
    userReviewSchema,
}