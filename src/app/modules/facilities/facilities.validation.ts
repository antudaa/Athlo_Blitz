import { z } from "zod";

export const createFacilityValidationSchema = z.object({
  body: z.object({
    user: z.string({
      required_error: 'UserId is required!',
    }).min(24,).max(24, ''),
    name: z.string().min(1, "Name is required!"),
    description: z.string().min(10, "Description is required!"),
    images: z.array(z.string()).nonempty("At least one image URL is required!"),
    pricePerHour: z.number().min(1, "Price is required!"),
    location: z.string().min(3, "Location is required!"),
  })
});

export const updateFacilityValidationSchema = z.object({
  name: z.string().optional(),
  description: z.string().optional(),
  pricePerHour: z.number().optional(),
  location: z.string().optional(),
  images: z.array(z.string()).optional(),
});

export const facilityValidation = {
  createFacilityValidationSchema,
  updateFacilityValidationSchema,
};
