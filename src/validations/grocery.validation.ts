import { z } from "zod";

const createGroceryValidation = z.object({
  name: z.string(),
  description: z.string(),
  price: z.number(),
  image: z.string().url(),
  stock: z.number()
});

const setInventoryValidation = z.object({
  groceryItemId: z.number({ message: "Grocery Item Id required"}),
  stock: z.number({ message: "Stock amount required"})
});

export {
  createGroceryValidation,
  setInventoryValidation
};