"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BookRoutes = void 0;
const express_1 = require("express");
const auth_1 = __importDefault(require("../../middlewares/auth"));
const validateRequest_1 = __importDefault(require("../../middlewares/validateRequest"));
const book_controller_1 = require("./book.controller");
const book_validation_1 = require("./book.validation");
const router = (0, express_1.Router)();
// Create Book (Protected)
router.post("/", auth_1.default, (0, validateRequest_1.default)(book_validation_1.BookValidation.createBookValidationSchema), book_controller_1.BookController.createBook);
// Get All Books (Public)
router.get("/", book_controller_1.BookController.getAllBooks);
// Get Logged User Books (Protected)
router.get("/my-books", auth_1.default, book_controller_1.BookController.getMyBooks);
// Get Single Book (Public)
router.get("/:id", book_controller_1.BookController.getSingleBook);
// Delete Book (Protected)
router.delete("/:id", auth_1.default, book_controller_1.BookController.deleteBook);
exports.BookRoutes = router;
