"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthController = void 0;
const catchAsync_1 = __importDefault(require("../../utils/catchAsync"));
const auth_service_1 = require("./auth.service");
const registerUser = (0, catchAsync_1.default)(async (req, res) => {
    const result = await auth_service_1.AuthService.registerUser(req.body);
    res.status(201).json({
        success: true,
        message: "User registered successfully",
        data: result,
    });
});
const loginUser = (0, catchAsync_1.default)(async (req, res) => {
    const result = await auth_service_1.AuthService.loginUser(req.body);
    res.cookie("token", result.accessToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: process.env.NODE_ENV === "production"
            ? "none"
            : "lax",
        maxAge: 7 * 24 * 60 * 60 * 1000,
    });
    res.status(200).json({
        success: true,
        message: "Login successful",
        data: {
            user: result.user,
        },
    });
});
const logoutUser = (0, catchAsync_1.default)(async (req, res) => {
    res.clearCookie("token");
    res.json({
        success: true,
        message: "Logout successful"
    });
});
const getCurrentUser = (0, catchAsync_1.default)(async (req, res) => {
    const user = await auth_service_1.AuthService.getCurrentUser(req.user.userId);
    res.status(200).json({
        success: true,
        message: "User retrieved successfully",
        data: user,
    });
});
exports.AuthController = {
    registerUser,
    loginUser,
    logoutUser,
    getCurrentUser
};
