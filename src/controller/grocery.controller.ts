import { asyncHandler } from "../utils/asyncHandler";
import prisma from "../utils/db";
import { createGroceryValidation, orderGroceryValidation, setInventoryValidation } from "../validations/grocery.validation";

const getAllGroceryItem = asyncHandler(async (req, res) => {

  const groceryItems = await prisma.grocery.findMany()

  if (!groceryItems) {
    return res.status(404).json({
      message: "No grocery items found"
    });
  };

  return res.status(200).json({
    message: "Grocery Items fetched successfully",
    groceryItems
  });
});

const getGroceryItemById = asyncHandler(async (req, res) => {

  const { id } = req.params;

  const groceryItem = await prisma.grocery.findUnique({
    where: { id: Number(id) }
  });

  return res.status(200).json({
    message: "Grocery item fetched successfully",
    groceryItem
  });
});

const createGroceryItem = asyncHandler(async (req, res) => {

  const input = createGroceryValidation.safeParse(req.body);
  if (!input.success) {
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

  if (!groceryItem) {
    return res.status(400).json({
      message: "Error in creating Grocery Item"
    });
  };

  return res.status(201).json({
    message: "Grocery Item added successfully",
    groceryItem
  });
});

const editInventory = asyncHandler(async (req, res) => {

  const input = setInventoryValidation.safeParse(req.body);
  if (!input.success) {
    return res.status(400).json({
      message: "Invalid Input",
      error: input.error.errors
    });
  };

  const { groceryItemId, stock } = input.data;

  const groceryItem = await prisma.grocery.findUnique({
    where: { id: groceryItemId }
  });

  if (!groceryItem) {
    return res.status(404).json({
      message: "Grocery Item not found"
    });
  };

  const updatedInventory = await prisma.grocery.update({
    where: { id: groceryItemId },
    data: { stock: { increment: stock } }
  });

  if (!groceryItem) {
    return res.status(404).json({
      message: "Failed to update Inventory"
    })
  }

  return res.status(200).json({
    message: "Inventory Updated",
    updatedInventory
  });

});

const orderItem = asyncHandler(async (req, res) => {

  const userId = (req as any).user.id;

  const input = orderGroceryValidation.safeParse(req.body);
  if (!input.success) {
    return res.status(400).json({
      message: "Invalid Input",
      error: input.error.errors
    });
  };

  const { groceryItemId, qty } = input.data;

  const groceryItem = await prisma.grocery.findUnique({
    where: { id: groceryItemId }
  });

  if (!groceryItem) {
    return res.status(404).json({
      message: "Grocery Item not found"
    });
  };

  if (groceryItem?.stock < qty) {
    return res.status(200).json({
      message: "Insufficient stock",
      stock: groceryItem.stock
    });
  };

  await prisma.$transaction(async (tx) => {

    const orderInfo = await tx.order.findFirst({
      where: { userId }
    });

    let initialOrder;
    if (!orderInfo) {
      const newInitialOrder = await tx.order.create({
        data: {
          userId,
          total: 0
        }
      });
      initialOrder = newInitialOrder;
    };

    const availableStock = await tx.grocery.update({
      where: { id: groceryItemId },
      data: { stock: { decrement: qty } }
    });

    const price = groceryItem.price * qty;

    const finalOrderItem = await tx.orderItem.create({
      data: {
        groceryId: groceryItemId,
        orderId: orderInfo?.id ?? initialOrder!.id,
        quantity: qty,
        price,
      }
    });

    const allItems = await tx.orderItem.findMany({
      where: { orderId: orderInfo?.id ?? initialOrder!.id }//
    });

    const totalPrice = allItems.map(item => item.price).reduce((acc, curVal) => acc + curVal, 0);

    const finalOrder = await tx.order.update({
      where: { id: orderInfo?.id ?? initialOrder!.id },
      data: { total: totalPrice }
    });

    return res.status(201).json({
      message: "Order placed successfully",
      finalOrder
    });
  });

});

const getOrder = asyncHandler( async (req, res) => {

  const userId = (req as any).user.id;

  const myOrder = await prisma.order.findFirst({
    where: { userId },
    include: { OrderItem: true }
  });

  if(!myOrder){
    return res.status(404).json({
      message: "Order not found"
    });
  };

  return res.status(200).json({
    message: "Order fetched successfully",
    myOrder
  });

});

export {
  createGroceryItem,
  getAllGroceryItem,
  getGroceryItemById,
  editInventory,
  orderItem,
  getOrder
};

