"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const mongoose_1 = __importDefault(require("mongoose"));
const app_1 = __importDefault(require("./app"));
const PORT = process.env.PORT || 5000;
async function main() {
    try {
        await mongoose_1.default.connect(process.env.DATABASE_URL);
        console.log("MongoDB Connected");
        app_1.default.listen(PORT, () => {
            console.log(`Server running on ${PORT}`);
        });
    }
    catch (error) {
        console.log("Failed to connect with database");
    }
}
main();
