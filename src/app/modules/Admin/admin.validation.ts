import { z } from "zod";

// Define the admin validation schema directly for req.body
const bodySchema = z.object({
  password: z.string().min(4, "Password is required!"),
  body: z.object({
    name: z.string().min(1, "Name is required!"),
    email: z.string().email("Invalid email address!"),
    phone: z.string().min(10, "Phone number must be at least 10 digits long."),
    profileImage: z.string().min(1).optional(),
    address: z.string().min(1, "Address is required!"),
  })
});

const createAdminValidationSchema = z.object({
  body: bodySchema,
  cookies: z.any().optional(),
});

export const AdminValidation = {
  createAdminValidationSchema,
};
