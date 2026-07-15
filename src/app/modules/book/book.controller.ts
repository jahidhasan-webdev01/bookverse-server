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

export const BookController = {
    createBook,
    getAllBooks
};