import { z } from "zod";

const registerValidationSchema = z.object({
    name: z.string().min(2),
    email: z.email(),
    password: z.string().min(6),
});

const loginValidationSchema = z.object({
    email: z.email(),
    password: z.string().min(6),
});

export const AuthValidation = {
    registerValidationSchema,
    loginValidationSchema,
};