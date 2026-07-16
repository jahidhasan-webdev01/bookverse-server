import { Schema, model } from "mongoose";
import { IBook } from "./book.interface";

const bookSchema = new Schema<IBook>(
    {
        title: {
            type: String,
            required: true,
            trim: true,
        },

        author: {
            type: String,
            required: true,
        },

        category: {
            type: String,
            required: true,
        },

        shortDescription: {
            type: String,
            required: true,
        },

        description: {
            type: String,
            required: true,
        },

        coverImage: {
            type: String,
        },

        publishedYear: {
            type: Number,
            required: true,
        },

        pages: {
            type: Number,
            required: true,
        },

        rating: {
            type: Number,
            required: true,
            default: 5,
            min: 1,
            max: 5,
        },

        status: {
            type: String,
            enum: ["Available", "Borrowed"],
            default: "Available",
        },

        createdBy: {
            type: Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
    },
    {
        timestamps: true,
    }
);

export const Book = model<IBook>("Book", bookSchema);