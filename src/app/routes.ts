import { Router } from "express";
import { AuthRoutes } from "./modules/auth/auth.route";
import { BookRoutes } from "./modules/book/book.route";

const router = Router();

router.use("/auth", AuthRoutes);
router.use("/books", BookRoutes);

export default router;