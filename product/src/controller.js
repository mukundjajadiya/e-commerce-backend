import dotenv from "dotenv";

import Product from "./model.js";
import { PORT } from "../index.js";
import { validateProductId } from "../utils/validateProductId.js";

dotenv.config();

// CHECK SERVER HEALTH
export const checkServerHealth = async (req, res) => {
  res.status(200).json({
    status: "200 OK",
    message: `Product server is running on port : ${PORT}`,
  });
};

// GET ALL products
export const getAllProducts = async (req, res) => {
  try {

    const allProducts = await Product.find();

    return res.status(200).json({
      status: "200 OK",
      message: "All product fetch successfully.",
      products: allProducts || [],
    });
  } catch (error) {
    console.log(error.stack);

    return res
      .status(500)
      .json({ status: "500 Server Error", message: "Internal server error." });
  }
};

// GET product by id
export const getProductById = async (req, res) => {
  try {
    const { id } = req.params;
    const isValidId = await validateProductId(id);

    // validate product id
    if (!isValidId) {
      return res.status(400).json({
        status: "400 Bad Request",
        message: "Provide valid id.",
      });
    }

    const foundProduct = await Product.findOne({ _id: id });

    // check product found
    if (!foundProduct) {
      return res.status(400).json({
        status: "404 Not Found",
        message: `Product with id (${id}) not found.`,
      });
    }

    // return founded product
    return res.status(200).json({
      status: "200 OK",
      message: `Product with id (${id}) fetch successfully.`,
      product: foundProduct,
    });
  } catch (error) {
    console.log(error.stack);

    return res
      .status(500)
      .json({ status: "500 Server Error", message: "Internal server error." });
  }
};

// CREATE product
export const createProduct = async (req, res) => {
  try {
    const { title, description, price, quantity } = req.body;

    // product validation
    if (!(title && description && price && quantity)) {
      return res.status(400).json({
        status: "400 Bad Request",
        message: "All field are required",
      });
    }

    // check product exist or not
    const oldProduct = await Product.findOne({ title, description });
    if (oldProduct) {
      return res.status(409).json({
        status: "409 Conflict",
        message: "Product already created.",
        product: oldProduct,
      });
    }

    // insert product to db
    const newProduct = await Product.create({ ...req.body });

    return res.status(201).json({
      status: "201 Created",
      message: `${req.body.title} created successfully.`,
      product: newProduct,
    });
  } catch (error) {
    console.log(error.stack);

    return res
      .status(500)
      .json({ status: "500 Server Error", message: "Internal server error." });
  }
};

// UPDATE product by id
export const updateProductById = async (req, res) => {
  try {
    const { id } = req.params;
    const isValidId = await validateProductId(id);

    // validate product id
    if (!isValidId) {
      return res.status(400).json({
        status: "400 Bad Request",
        message: "Provide valid id.",
      });
    }

    // check product exist in db
    const foundProduct = await Product.findOne({ _id: id });

    if (!foundProduct) {
      return res.status(404).json({
        status: "404 Not Found",
        message: `Product with id ${id} not exist.`,
      });
    }

    // update product
    const result = await Product.updateOne(
      { _id: id },
      { $set: { ...req.body } }
    );

    // check update result
    if (!result) {
      return res.status(400).json({
        status: "400 Bad Request",
        message: `Unable to update product ${id}`,
      });
    }

    const updatedProduct = await Product.findOne({ _id: id });

    // return updated product
    return res.status(200).json({
      status: "200 OK",
      message: `Product with id (${id}) update successfully.`,
      product: updatedProduct,
    });
  } catch (error) {
    console.log(error.stack);

    return res
      .status(500)
      .json({ status: "500 Server Error", message: "Internal server error." });
  }
};

// DELETE product
export const deleteProductById = async (req, res) => {
  try {
    const { id } = req.params;

    // validate product id
    const isValidId = await validateProductId(id);

    if (!isValidId) {
      return res.status(400).json({
        status: "400 Bad Request",
        message: "Provide valid id.",
      });
    }

    // check product is exist
    const targetProduct = await Product.findOne({ _id: id });
    if (!targetProduct) {
      return res.status(404).json({
        status: "404 Not Found",
        message: `Product with id (${id}) not found.`,
      });
    }

    // delete product
    const result = await Product.deleteOne({ _id: id });

    // check delete result
    if (!result) {
      return res.status(400).json({
        status: "400 Bad Request",
        message: `Unable to delete product ${id}`,
      });
    }

    // return updated product
    return res.status(200).json({
      status: "200 OK",
      message: `Product with id (${id}) deleted successfully.`,
    });
  } catch (error) {
    console.log(error.stack);

    return res
      .status(500)
      .json({ status: "500 Server Error", message: "Internal server error." });
  }
};
