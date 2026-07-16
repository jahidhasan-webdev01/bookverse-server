"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BcryptHandler = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const hashPassword = async (password) => {
    const saltRounds = Number(process.env.BCRYPT_SALT_ROUNDS) || 10;
    return await bcrypt_1.default.hash(password, saltRounds);
};
const comparePassword = async (plainPassword, hashedPassword) => {
    return await bcrypt_1.default.compare(plainPassword, hashedPassword);
};
exports.BcryptHandler = {
    hashPassword,
    comparePassword,
};
