import { z } from "zod";


export const createUserValidationSchema = z.object({
    body: z.object({
        name: z.string(),
        email: z.string().email(),
        password: z.string({
            invalid_type_error: 'Password must be string'
        })
            .max(30, { message: `Password can not be more then 30 characters` }),
        phone: z.string(),
        role: z.enum(['admin', 'user']),
        address: z.string(),
    })
});

export const userValidations = {
    createUserValidationSchema,
}