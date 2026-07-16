"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = handler;
const mongoose_1 = __importDefault(require("mongoose"));
const app_1 = __importDefault(require("../src/app"));
let isConnected = false;
async function connectDB() {
    if (isConnected)
        return;
    await mongoose_1.default.connect(process.env.DATABASE_URL);
    isConnected = true;
    console.log("MongoDB Connected");
}
async function handler(req, res) {
    await connectDB();
    return (0, app_1.default)(req, res);
}
