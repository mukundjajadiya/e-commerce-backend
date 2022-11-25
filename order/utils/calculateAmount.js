import { getProductById } from "./getProductById.js";

export const calculateAmount = async (products, res) => {
  try {
    
    let totalPrice = 0;
    for (let i = 0; i < products.length; i++) {
      const { productId, quantity } = products[i];

      const { price } = await getProductById(productId, res);

      totalPrice += price * quantity;
    }

    return totalPrice;
  } catch (err) {
    console.log("[ERROR]", err.response?.data);
    console.log("[ERROR]", err.message);
  }
};
