import { z } from "zod";

const createGroceryValidation = z.object({
  name: z.string(),
  description: z.string(),
  price: z.number(),
  image: z.string().url(),
  stock: z.number()
});

export {
  createGroceryValidation
};