import express from "express";
import cors from "cors";

const app = express();

app.use(express.json());
app.use(cors());

//routes
import healthCheckRouter from "./router/healthCheck.router";
import userRouter from "./router/user.router";
import { authMiddleware } from "./middleware/auth.middleware";

app.use("/api/v1/",  healthCheckRouter);
app.use("/api/v1/user", userRouter);

export { app };