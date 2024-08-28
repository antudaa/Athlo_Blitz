import { z } from "zod";

// Define the address validation schema
const clientAddressValidationSchema = z.object({
  streetAddress: z.string().min(1, "Street address is required!"),
  city: z.string().min(1, "City is required!"),
  state: z.string().min(1, "State is required!"),
  postalCode: z.string().min(1, "Postal code is required!"),
  country: z.string().min(1, "Country is required!"),
});

// Define the admin validation schema directly for req.body
const createClientValidationSchema = z.object({
  body: z.object({
    name: z.string().min(1, "Name is required!"),
    email: z.string().email("Invalid email address!"),
    phone: z.string().min(10, "Phone number must be at least 10 digits long."),
    profileImage: z.string().min(1).optional(), 
    address: clientAddressValidationSchema,
  })
});

export const ClientValidation = {
  createClientValidationSchema,
};
