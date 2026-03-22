import cors from "cors";
import express, { Application, Request, Response } from "express";
import path from "path";
import globalErrorHandler from "./app/middlewares/globalErrorHandler";
import notFound from "./app/middlewares/notFound";
import { generalRateLimiter } from "./app/middlewares/rateLimiter";
import router from "./app/routes";
import config from "./config";

const app: Application = express();

// CORS configuration
app.use(
  cors({
    origin: [config.client_url, "http://localhost:3000", "http://localhost:5500"],
    credentials: true,
  })
);

// Rate limiting
app.use(generalRateLimiter);

// Body parser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Static files (uploads folder)
app.use('/uploads', express.static(path.join(process.cwd(), 'uploads')));

// API routes
app.use("/api", router);

// Root route
app.get("/", (req: Request, res: Response) => {
  res.json({
    success: true,
    message: "Portfolio Backend API is running 🚀",
    version: "1.0.0",
  });
});

// Global error handler
app.use(globalErrorHandler);

// 404 handler
app.use(notFound);

export default app;
