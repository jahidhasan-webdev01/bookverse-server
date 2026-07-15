import { Router } from "express";
import auth from "../../middlewares/auth";
import validateRequest from "../../middlewares/validateRequest";
import { BookController } from "./book.controller";
import { BookValidation } from "./book.validation";

const router = Router();


// Create Book (Protected)
router.post(
    "/",
    auth,
    validateRequest(BookValidation.createBookValidationSchema),
    BookController.createBook
);


// Get All Books (Public)
router.get(
    "/",
    BookController.getAllBooks
);


// Get Logged User Books (Protected)
router.get(
    "/my-books",
    auth,
    BookController.getMyBooks
);


// Get Single Book (Public)
router.get(
    "/:id",
    BookController.getSingleBook
);


// Delete Book (Protected)
router.delete(
    "/:id",
    auth,
    BookController.deleteBook
);


export const BookRoutes = router;