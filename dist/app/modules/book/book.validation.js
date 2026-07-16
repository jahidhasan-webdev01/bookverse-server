"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BookValidation = void 0;
const zod_1 = require("zod");
const createBookValidationSchema = zod_1.z.object({
    title: zod_1.z.string().min(2),
    author: zod_1.z.string().min(2),
    category: zod_1.z.string(),
    shortDescription: zod_1.z
        .string(),
    description: zod_1.z
        .string(),
    coverImage: zod_1.z.string().url().optional(),
    publishedYear: zod_1.z
        .number()
        .min(1000)
        .max(new Date().getFullYear()),
    pages: zod_1.z
        .number()
        .positive(),
    rating: zod_1.z
        .number()
        .min(1)
        .max(5),
    status: zod_1.z
        .enum([
        "Available",
        "Borrowed",
    ])
        .default("Available"),
});
exports.BookValidation = {
    createBookValidationSchema,
};
