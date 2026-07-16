import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";

import routes from "./app/routes";
import globalErrorHandler from "./app/middlewares/globalErrorHandler";


const app = express();



app.use(
    cors({
        origin: [
            process.env.CLIENT_URL!,
            "http://localhost:3000",
        ],
        credentials: true,
    })
);



app.use(express.json());

app.use(cookieParser());



app.use(
    "/api",
    routes
);



app.get(
    "/",
    (_, res) => {

        res.status(200).json({
            success: true,
            message: "BookVerse API Running",
        });

    }
);



app.use(
    (req, res) => {

        res.status(404).json({
            success: false,
            message: `Route ${req.originalUrl} not found`,
        });

    }
);



app.use(
    globalErrorHandler
);



export default app;