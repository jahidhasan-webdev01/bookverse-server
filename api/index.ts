import mongoose from "mongoose";
import app from "../src/app";

let isConnected = false;

async function connectDB() {
    if (isConnected) return;

    await mongoose.connect(
        process.env.DATABASE_URL!
    );

    isConnected = true;
}


export default async function handler(
    req: any,
    res: any
) {
    await connectDB();

    return app(req, res);
}