import { z } from "zod";

const createBookValidationSchema = z.object({
    title: z.string().min(2),
    author: z.string().min(2),
    category: z.string(),
    shortDescription: z.string().min(10),
    description: z.string().min(20),
    coverImage: z.string().url().optional(),
    publishedYear: z.number(),
    pages: z.number(),
    status: z.enum(["Available", "Borrowed"]).optional(),
});

export const BookValidation = {
    createBookValidationSchema,
};