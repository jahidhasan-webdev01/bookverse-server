import { Router } from "express";
import { AuthController } from "./auth.controller";
import validateRequest from "../../middlewares/validateRequest";
import { AuthValidation } from "./auth.validation";
import auth from "../../middlewares/auth";

const router = Router();

router.post("/register", validateRequest(AuthValidation.registerValidationSchema), AuthController.registerUser);
router.post("/login", validateRequest(AuthValidation.loginValidationSchema), AuthController.loginUser);
router.post("/logout", AuthController.logoutUser);
router.get("/me", auth, AuthController.getCurrentUser);

export const AuthRoutes = router;