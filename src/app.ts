import express from "express";
import cors from "cors";
import routes from "./app/routes";
import globalErrorHandler from "./app/middlewares/globalErrorHandler";

const app = express();

// CORS
app.use(
  cors({
    origin: [
      "http://localhost:3000",
      process.env.CLIENT_URL || "",
    ],
    credentials: true,
  })
);

// Body parser
app.use(express.json());

// API Routes
app.use("/api", routes);


// Health check
app.get("/", (_, res) => {
  res.status(200).json({
    success: true,
    message: "BookVerse API Running",
  });
});


// Not Found Route
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: `Route ${req.originalUrl} not found`,
  });
});


// Global Error Handler
app.use(globalErrorHandler);


export default app;