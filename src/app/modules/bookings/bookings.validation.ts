import { z } from "zod";


export const createBookingValidationSchema = z.object({
    body: z.object({
        date: z.string().min(1, 'Date is required!'),
        facility: z.string().min(1, 'Facility Id is required!'),
        startTime: z.string().min(1, 'Start time is required!'),
        endTime: z.string().min(1, 'End time is required!'),
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