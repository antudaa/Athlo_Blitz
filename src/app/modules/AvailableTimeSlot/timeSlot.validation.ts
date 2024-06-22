import { z } from "zod";

const createTimeSlotValidationSchema = z.object({
  body: z.object({
    startTime: z.string().min(5, "Start time is required!"),
    endTime: z.string().min(5, "End Time is required!"),
  }),
});

export const TimeSlotValidation = {
  createTimeSlotValidationSchema,
};
