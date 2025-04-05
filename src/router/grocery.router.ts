import { Router } from "express";
import { createGroceryItem, editInventory, getAllGroceryItem, getGroceryItemById, getOrder, orderItem } from "../controller/grocery.controller";
import { authMiddleware } from "../middleware/auth.middleware";

const router = Router();

router.route("/get").get(getAllGroceryItem);
router.route("/get/:id").get(getGroceryItemById);

router.route("/create").post(authMiddleware(["ADMIN"]), createGroceryItem);
router.route("/edit").put(authMiddleware(["ADMIN"]), editInventory);

router.route("/order").post(authMiddleware(["CUSTOMER"]), orderItem);
router.route("/my-order").get(authMiddleware(["CUSTOMER"]), getOrder);
export default router;