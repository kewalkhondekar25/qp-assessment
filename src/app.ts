import express from "express";
import cors from "cors";

const app = express();

app.use(express.json());
app.use(cors());

//routes
import healthCheckRouter from "./router/healthCheck.router";
import userRouter from "./router/user.router";
import groceryRouter from "./router/grocery.router"

app.use("/api/v1/",  healthCheckRouter);
app.use("/api/v1/user", userRouter);
app.use("/api/v1/grocery", groceryRouter);

export { app };