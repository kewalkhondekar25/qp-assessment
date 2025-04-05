import { asyncHandler } from "../utils/asyncHandler";
import prisma from "../utils/db";
import { createGroceryValidation } from "../validations/grocery.validation";

const getAllGrocery = asyncHandler( async (req, res) => {

});

const getGroceryItem = asyncHandler( async (req, res) => {

});

const createGroceryItem = asyncHandler( async (req, res) => {
  
  const input = createGroceryValidation.safeParse(req.body);
  if(!input.success){
    return res.status(400).json({
      message: "Invalid Input",
      error: input.error.errors
    });
  };

  const { name, description, image, price, stock } = input.data;

  const groceryItem = await prisma.grocery.create({
    data: {
      name,
      description,
      image,
      price,
      stock
    }
  });

  if(!groceryItem){
    return res.status(400).json({
      message: "Error in creating Grocery Item"
    });
  };

  return res.status(201).json({
    message: "Grocery Item added successfully",
    groceryItem
  });
});

export {
  createGroceryItem
};

