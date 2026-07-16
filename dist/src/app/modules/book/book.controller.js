"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BookController = void 0;
const catchAsync_1 = __importDefault(require("../../utils/catchAsync"));
const book_service_1 = require("./book.service");
const createBook = (0, catchAsync_1.default)(async (req, res) => {
    const result = await book_service_1.BookService.createBook(req.body, req.user);
    res.status(201).json({
        success: true,
        message: "Book created successfully",
        data: result,
    });
});
const getAllBooks = (0, catchAsync_1.default)(async (req, res) => {
    const result = await book_service_1.BookService.getAllBooks(req.query);
    res.status(200).json({
        success: true,
        message: "Books retrieved successfully",
        meta: result.meta,
        data: result.data,
    });
});
const getSingleBook = (0, catchAsync_1.default)(async (req, res) => {
    const result = await book_service_1.BookService.getSingleBook(req.params.id);
    res.status(200).json({
        success: true,
        message: "Book retrieved successfully",
        data: result,
    });
});
const deleteBook = (0, catchAsync_1.default)(async (req, res) => {
    await book_service_1.BookService.deleteBook(req.params.id);
    res.status(200).json({
        success: true,
        message: "Book deleted successfully",
        data: null,
    });
});
const getMyBooks = (0, catchAsync_1.default)(async (req, res) => {
    const userId = req.user.userId;
    const result = await book_service_1.BookService.getMyBooks(userId);
    res.status(200).json({
        success: true,
        message: "My books retrieved successfully",
        data: result,
    });
});
exports.BookController = {
    createBook,
    getAllBooks,
    getSingleBook,
    deleteBook,
    getMyBooks
};
