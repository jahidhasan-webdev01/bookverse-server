"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const AppError_1 = __importDefault(require("../errors/AppError"));
const jwtHandler_1 = require("../utils/jwtHandler");
const auth = (req, res, next) => {
    const token = req.cookies.token;
    if (!token) {
        return next(new AppError_1.default(401, "You are not authorized"));
    }
    try {
        const decoded = jwtHandler_1.JwtHandler.verifyToken(token);
        req.user = decoded;
        next();
    }
    catch {
        next(new AppError_1.default(401, "Invalid or expired token"));
    }
};
exports.default = auth;
