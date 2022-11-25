import dotenv from "dotenv";

import Order from "./model.js";
import { PORT } from "../index.js";
import { calculateAmount } from "../utils/calculateAmount.js";
import { validateProductId } from "../utils/validateProductId.js";

dotenv.config();

// CHECK SERVER HEALTH
export const checkServerHealth = async (req, res) => {
  return res.status(200).json({
    status: "200 OK",
    message: `Order server is running on port : ${PORT}`,
  });
};

// CREATE Order
export const createOrder = async (req, res) => {
  try {
    const userId = req.user.user_id;
    let { products } = req.body;

    const pdata = products.map((product) => {
      const isValidId = validateProductId(product.productId);
      if (!isValidId)
        return res.status(400).json({
          status: "400 Bad Request",
          message: `ProductId ${product.productId} is not valid.`,
        });
    });
    let amount = await calculateAmount(products, res);

    if (!(amount > 0)) {
      return res.status(400).json({
        status: "400 Bad Request",
        message: "Provide quantity at least one.",
      });
    }

    let address = {
      addressLine1: "hello address line 1",
      addressLine2: "hello address line 2",
      city: "Surat",
      pincode: 395004,
      state: "Gujarat",
    };

    const createdOrder = await Order.create({
      userId,
      products,
      amount,
      address,
    });

    if (!createdOrder) {
      return res.status(500).json({
        status: "500 Internal Server Error",
        message: "Internal Server Error, Unable to create order.",
      });
    }

    return res.status(201).json({
      status: "201 Created",
      message: `Order created successfully.`,
      order: {
        id: createdOrder._id,
        products: createdOrder.products,
        amount: createdOrder.amount,
        userId: createdOrder.userId,
        address: createdOrder.address,
        status: createdOrder.status,
      },
    });
  } catch (error) {
    console.log("[ERROR-controller.js]", error.message);
  }
};
