import { JwtPayload } from "jsonwebtoken";
import { IBook } from "./book.interface";
import { Book } from "./book.model";
import AppError from "../../errors/AppError";

const createBook = async (
    payload: Omit<IBook, "createdBy" | "rating" | "status">,
    user: JwtPayload
) => {
    const book = await Book.create({
        ...payload,
        createdBy: user.userId,
    });

    return book;
};

const getAllBooks = async (query: Record<string, unknown>) => {
    const {
        searchTerm,
        category,
        status,
        sortBy = "createdAt",
        sortOrder = "desc",
        page = "1",
        limit = "8",
    } = query;

    const filter: Record<string, unknown> = {};

    // Search
    if (searchTerm) {
        filter.$or = [
            { title: { $regex: searchTerm, $options: "i" } },
            { author: { $regex: searchTerm, $options: "i" } },
            { category: { $regex: searchTerm, $options: "i" } },
        ];
    }

    // Filter
    if (category) {
        filter.category = category;
    }

    if (status) {
        filter.status = status;
    }

    const skip =
        (Number(page) - 1) * Number(limit);

    const books = await Book.find(filter)
        .populate("createdBy", "name email")
        .sort({
            [sortBy as string]: sortOrder === "asc" ? 1 : -1,
        })
        .skip(skip)
        .limit(Number(limit));

    const total = await Book.countDocuments(filter);

    return {
        meta: {
            page: Number(page),
            limit: Number(limit),
            total,
            totalPage: Math.ceil(total / Number(limit)),
        },
        data: books,
    };
};

const getSingleBook = async (id: string) => {
    const book = await Book.findById(id).populate(
        "createdBy",
        "name email"
    );

    if (!book) {
        throw new AppError(404, "Book not found");
    }

    return book;
};

const deleteBook = async (id: string) => {
    const book = await Book.findById(id);

    if (!book) {
        throw new AppError(404, "Book not found");
    }

    await Book.findByIdAndDelete(id);

    return null;
};

const getMyBooks = async (userId: string) => {
    const books = await Book.find({
        createdBy: userId,
    }).sort({
        createdAt: -1,
    });

    return books;
};

export const BookService = {
    createBook,
    getAllBooks,
    getSingleBook,
    deleteBook,
    getMyBooks
};