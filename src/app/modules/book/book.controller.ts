import { Request, Response } from "express";
import { JwtPayload } from "jsonwebtoken";
import catchAsync from "../../utils/catchAsync";
import { BookService } from "./book.service";

const createBook = catchAsync(async (req: Request, res: Response) => {
    const result = await BookService.createBook(
        req.body,
        req.user as JwtPayload
    );

    res.status(201).json({
        success: true,
        message: "Book created successfully",
        data: result,
    });
});

const getAllBooks = catchAsync(async (req, res) => {
    const result = await BookService.getAllBooks(req.query);

    res.status(200).json({
        success: true,
        message: "Books retrieved successfully",
        meta: result.meta,
        data: result.data,
    });
});

const getSingleBook = catchAsync(async (req, res) => {
    const result = await BookService.getSingleBook(req.params.id as string);

    res.status(200).json({
        success: true,
        message: "Book retrieved successfully",
        data: result,
    });
});

const deleteBook = catchAsync(async (req, res) => {
    await BookService.deleteBook(req.params.id as string);

    res.status(200).json({
        success: true,
        message: "Book deleted successfully",
        data: null,
    });
});

const getMyBooks = catchAsync(async (req, res) => {
    const userId = req.user.userId;

    const result = await BookService.getMyBooks(
        userId
    );

    res.status(200).json({
        success: true,
        message: "My books retrieved successfully",
        data: result,
    });
});

export const BookController = {
    createBook,
    getAllBooks,
    getSingleBook,
    deleteBook,
    getMyBooks
};