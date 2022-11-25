import express from "express";

import { verifyToken, verifyAdmin } from "../middlewares/index.js";

import {
  checkServerHealth,
  createProduct,
  getAllProducts,
  getProductById,
  updateProductById,
  deleteProductById,
} from "./controller.js";

const router = express.Router();

router.get("/all", getAllProducts);

router.get("/health", checkServerHealth);

router.get("/:id", getProductById);

router.post("/", verifyToken, verifyAdmin, createProduct);

router.patch("/:id", verifyToken, verifyAdmin, updateProductById);

router.delete("/:id", verifyToken, verifyAdmin, deleteProductById);

export default router;
