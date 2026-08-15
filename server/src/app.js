import express from "express";
import dotenv from "dotenv";
import path from "node:path";
import { fileURLToPath } from "node:url";
import cookieParser from "cookie-parser";
import authRouter from "./routes/auth.routes.js";
import cors from "cors";
import interviewRouter from "./routes/interview.routes.js";

const app = express();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const isProduction = process.env.NODE_ENV === "production";

app.use(express.json());
app.use(cookieParser());

if (!isProduction) {
  app.use(
    cors({
      origin: "http://localhost:5173",
      credentials: true,
    }),
  );
}

/*Using all auth routes here */
app.use("/api/auth", authRouter);
app.use("/api/interview", interviewRouter);

if (isProduction) {
  const distPath = path.join(__dirname, "../../client/dist");

  app.use(express.static(distPath));

  // SPA fallback: serve index.html for any non-API GET request
  app.use((req, res, next) => {
    if (req.method === "GET" && !req.path.startsWith("/api/")) {
      return res.sendFile(path.join(distPath, "index.html"));
    }
    next();
  });
}

export default app;
