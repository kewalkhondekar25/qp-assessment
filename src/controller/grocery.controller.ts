import { asyncHandler } from "../utils/asyncHandler";
import prisma from "../utils/db";
import { createGroceryValidation } from "../validations/grocery.validation";

const getAllGroceryItem = asyncHandler( async (req, res) => {

  const groceryItems = await prisma.grocery.findMany()
  
  if(!groceryItems){
    return res.status(404).json({
      message: "No grocery items found"
    });
  };

  return res.status(200).json({
    message: "Grocery Items fetched successfully",
    groceryItems
  });
});

const getGroceryItemById = asyncHandler( async (req, res) => {
  
  const { id } = req.params;

  const groceryItem = await prisma.grocery.findUnique({
    where: { id: Number(id) }
  });

  return res.status(200).json({
    message: "Grocery item fetched successfully",
    groceryItem
  });
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
  createGroceryItem,
  getAllGroceryItem,
  getGroceryItemById
};

