import express from "express";
import cors from "cors";
import bcrypt from "bcryptjs";
import { user } from "./utils/user";
import jwt from "jsonwebtoken";
import { authMiddleware } from "./middleware/user.middleware";

const app = express();

app.use(express.json());
app.use(cors());

app.post("/register", async (req, res) => {

  try {
    const { userName, password } = req.body;

    if(!userName || !password){
      res.status(404).json({
        message: "Input missing"
      });
    };

    const hashedPassword = await bcrypt.hash(password, 10);

    user.name = userName;
    user.password = hashedPassword;

    res.status(201).json({
      message: "Register succesfully",
    });

  } catch (error) {
    console.log(error);
  }
});

app.post("/login", async (req, res) => {
  try {
    const { userName, password } = req.body;

    if(!userName || !password){
      res.status(404).json({
        message: "No input"
      });
    };

    const decryptPassword = await bcrypt.compare(password, user.password);
    
    if(userName !== user.name || !decryptPassword){
      res.status(401).json({
        message: "Unauthorize"
      });
      return;
    };

    if(!process.env.JWT_SECRET){
      res.status(400).json({
        message: "No secret provided"
      });
      return;
    };
    
    const token = jwt.sign({userName}, process.env.JWT_SECRET, { expiresIn: "24h"});

    res.status(200).json({
      message: "Login Successfully",
      token
    });

  } catch (error) {
    console.log(error);
  }
});

app.post("/wallet", authMiddleware, async(req, res) => {
  res.status(200).json({
    message: "welcome"
  });
});

export { app };