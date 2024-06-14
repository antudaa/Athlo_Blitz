import { z } from "zod";


export const createBookingValidationSchema = z.object({
    body: z.object({
        date: z.string(),
        facility: z.string(),
        startTime: z.string(),
        endTime: z.string(),
    })
});

export const updateBookingValidationSchema = z.object({
    body: z.object({
        date: z.string(),
        facility: z.string(),
        startTime: z.string(),
        endTime: z.string(),
    })
});

export const bookingValidations = {
    createBookingValidationSchema,
    updateBookingValidationSchema,
}