import express from "express";
import cors from "cors";
import { authMiddleware } from "./middleware/auth.middleware";

const app = express();

app.use(express.json());
app.use(cors());

//routes
import healthCheckRouter from "./router/healthCheck.router";
import userRouter from "./router/user.router";
import groceryRouter from "./router/grocery.router"

app.use("/api/v1/",  healthCheckRouter);
app.use("/api/v1/user", userRouter);
app.use("/api/v1/grocery", authMiddleware(["ADMIN"]), groceryRouter);

export { app };