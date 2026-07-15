import express from "express";
import cors from "cors";
import routes from "./app/routes";
import globalErrorHandler from "./app/middlewares/globalErrorHandler";

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api", routes);
app.use(globalErrorHandler);

app.get("/", (_, res) => {
    res.send({
        success: true,
        message: "BookVerse API Running",
    });
});

export default app;