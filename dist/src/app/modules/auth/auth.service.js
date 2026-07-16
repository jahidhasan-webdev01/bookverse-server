"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const user_model_1 = require("../user/user.model");
const bcryptHandler_1 = require("../../utils/bcryptHandler");
const AppError_1 = __importDefault(require("../../errors/AppError"));
const jwtHandler_1 = require("../../utils/jwtHandler");
const registerUser = async (payload) => {
    const existingUser = await user_model_1.User.findOne({ email: payload.email });
    if (existingUser) {
        throw new AppError_1.default(409, "User already exists");
    }
    const hashedPassword = await bcryptHandler_1.BcryptHandler.hashPassword(payload.password);
    const user = await user_model_1.User.create({
        ...payload,
        password: hashedPassword,
    });
    const { password, ...userWithoutPassword } = user.toObject();
    return userWithoutPassword;
};
const loginUser = async (payload) => {
    // Check user exists
    const user = await user_model_1.User.findOne({ email: payload.email });
    if (!user) {
        throw new AppError_1.default(401, "Invalid email or password");
    }
    // Compare password
    const isPasswordMatched = await bcryptHandler_1.BcryptHandler.comparePassword(payload.password, user.password);
    if (!isPasswordMatched) {
        throw new AppError_1.default(401, "Invalid email or password");
    }
    // Create JWT
    const accessToken = jwtHandler_1.JwtHandler.createToken({
        userId: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
    });
    // Remove password from response
    const { password, ...userWithoutPassword } = user.toObject();
    return {
        accessToken,
        user: userWithoutPassword,
    };
};
const getCurrentUser = async (userId) => {
    const user = await user_model_1.User.findById(userId)
        .select("-password");
    if (!user) {
        throw new Error("User not found");
    }
    return user;
};
exports.AuthService = {
    registerUser,
    loginUser,
    getCurrentUser
};
