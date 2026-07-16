import { z } from "zod";

const createBookValidationSchema = z.object({
    title: z.string().min(2),
    author: z.string().min(2),
    category: z.string(),

    shortDescription: z
        .string(),

    description: z
        .string(),

    coverImage: z.string().url().optional(),

    publishedYear: z
        .number()
        .min(1000)
        .max(new Date().getFullYear()),

    pages: z
        .number()
        .positive(),

    rating: z
        .number()
        .min(1)
        .max(5),

    status: z
        .enum([
            "Available",
            "Borrowed",
        ])
        .default("Available"),
});

export const BookValidation = {
    createBookValidationSchema,
};