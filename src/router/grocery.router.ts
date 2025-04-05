import { Router } from "express";
import { createGroceryItem } from "../controller/grocery.controller";

const router = Router();

router.route("/create").post(createGroceryItem);

export default router;