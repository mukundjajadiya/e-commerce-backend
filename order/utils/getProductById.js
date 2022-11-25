import axios from "axios";
import env from "dotenv";

env.config();

const { PRODUCTS_SERVICE_URL } = process.env;

export const getProductById = async (productId, res) => {
  try {
    const { data } = await axios.get(`${PRODUCTS_SERVICE_URL}/${productId}`);
    return data.product;
  } catch (err) {
    const { data } = err.response;
    res.status(+data.status.split(" ")[0]).json(data);
    console.log("[ERROR-getProductById.js]", err.message);
  }
};
