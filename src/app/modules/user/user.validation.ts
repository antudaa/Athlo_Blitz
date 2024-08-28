import { z } from "zod";

// Define address validation schema
const addressValidationSchema = z.object({
  streetAddress: z.string().min(1, "Street address is required!"),
  city: z.string().min(1, "City is required!"),
  state: z.string().min(1, "State is required!"),
  postalCode: z.string().min(1, "Postal code is required!"),
  country: z.string().min(1, "Country is required!"),
});

// Define user validation schema for creating a user
const createUserValidationSchema = z.object({
  body: z.object({
    name: z.string().min(1, "Name is required!"),
    email: z.string().email("Invalid email address!"),
    password: z.string().min(6, "Password must be at least 6 characters long."),
    phone: z.string().min(10, "Phone number must be at least 10 digits long."),
    address: addressValidationSchema,
    role: z.enum(["user", "admin"]).optional(),
    status: z.enum(["active", "blocked"]).optional(),
    isDeleted: z.boolean().optional(),
  }),
});

// Define user validation schema for logging in a user
const loginUserValidationSchema = z.object({
  body: z.object({
    email: z.string().email("Invalid email address!"),
    password: z.string().min(6, "Password must be at least 6 characters long."),
  }),
});

export const UserValidation = {
  createUserValidationSchema,
  loginUserValidationSchema,
};
