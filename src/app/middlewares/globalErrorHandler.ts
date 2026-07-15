import { ErrorRequestHandler } from "express";

const globalErrorHandler: ErrorRequestHandler = (err, req, res, next) => {
    res.status(500).json({
        success: false,
        message: err.message || "Something went wrong",
    });
};

export default globalErrorHandler;