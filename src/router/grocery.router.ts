import { Router } from "express";
import { createGroceryItem, getAllGroceryItem, getGroceryItemById } from "../controller/grocery.controller";
import { authMiddleware } from "../middleware/auth.middleware";

const router = Router();

router.route("/get").get(getAllGroceryItem);
router.route("/get/:id").get(getGroceryItemById);
router.route("/create").post(authMiddleware(["ADMIN"]), createGroceryItem);

export default router;