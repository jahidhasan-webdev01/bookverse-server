import { Router } from "express";
import auth from "../../middlewares/auth";
import validateRequest from "../../middlewares/validateRequest";
import { BookController } from "./book.controller";
import { BookValidation } from "./book.validation";

const router = Router();

router.post(
    "/",
    auth,
    validateRequest(BookValidation.createBookValidationSchema),
    BookController.createBook
);
router.get("/", BookController.getAllBooks);

export const BookRoutes = router;