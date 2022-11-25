import express from "express";

import { verifyToken } from "../middlewares/index.js";

import { checkServerHealth, createOrder } from "./controller.js";

const router = express.Router();

router.get("/health", checkServerHealth);

// create order route
router.post("/", verifyToken, createOrder);

export default router;
