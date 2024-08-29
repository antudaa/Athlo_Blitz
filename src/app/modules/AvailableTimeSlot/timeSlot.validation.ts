import { z } from "zod";

const createTimeSlotValidationSchema = z.object({
  body: z.object({
    facility: z.string({
      required_error: 'Facility id is required!',
    }).min(24).max(24),
    date: z.date({
      required_error: 'Date is required!',
    }),
    startTime: z.string().min(5, "Start time is required!"),
    endTime: z.string().min(5, "End Time is required!"),
  }),
});

export const TimeSlotValidation = {
  createTimeSlotValidationSchema,
};
