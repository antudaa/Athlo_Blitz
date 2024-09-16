import { z } from "zod";

export const createBookingValidationSchema = z.object({
  body: z.object({
    date: z.string().trim(),
    facility: z.string().trim(),
    startTime: z.string().trim().min(1, "Start time is required!"),
    endTime: z.string().trim().min(1, "End time is required!"),
  }),
});

export const updateBookingValidationSchema = z.object({
  body: z.object({
    date: z.string().optional(),
    facility: z.string().optional(),
    startTime: z.string().optional(),
    endTime: z.string().optional(),
  }),
});

export const bookingValidations = {
  createBookingValidationSchema,
  updateBookingValidationSchema,
};
