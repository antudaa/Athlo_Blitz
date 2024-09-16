import { z } from "zod";

// Define the client validation schema for req.body
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

// Define the full validation schema that expects an object with 'body' and 'cookies'
const createClientValidationSchema = z.object({
  body: bodySchema,
  cookies: z.any().optional(),
});

export const ClientValidation = {
  createClientValidationSchema,
};