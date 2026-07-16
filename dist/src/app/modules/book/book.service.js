"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BookService = void 0;
const book_model_1 = require("./book.model");
const AppError_1 = __importDefault(require("../../errors/AppError"));
const createBook = async (payload, user) => {
    const book = await book_model_1.Book.create({
        ...payload,
        createdBy: user.userId,
    });
    return book;
};
const getAllBooks = async (query) => {
    const { searchTerm, category, status, sortBy = "createdAt", sortOrder = "desc", page = "1", limit = "8", } = query;
    const filter = {};
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
    const skip = (Number(page) - 1) * Number(limit);
    const books = await book_model_1.Book.find(filter)
        .populate("createdBy", "name email")
        .sort({
        [sortBy]: sortOrder === "asc" ? 1 : -1,
    })
        .skip(skip)
        .limit(Number(limit));
    const total = await book_model_1.Book.countDocuments(filter);
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
const getSingleBook = async (id) => {
    const book = await book_model_1.Book.findById(id).populate("createdBy", "name email");
    if (!book) {
        throw new AppError_1.default(404, "Book not found");
    }
    return book;
};
const deleteBook = async (id) => {
    const book = await book_model_1.Book.findById(id);
    if (!book) {
        throw new AppError_1.default(404, "Book not found");
    }
    await book_model_1.Book.findByIdAndDelete(id);
    return null;
};
const getMyBooks = async (userId) => {
    const books = await book_model_1.Book.find({
        createdBy: userId,
    }).sort({
        createdAt: -1,
    });
    return books;
};
exports.BookService = {
    createBook,
    getAllBooks,
    getSingleBook,
    deleteBook,
    getMyBooks
};
