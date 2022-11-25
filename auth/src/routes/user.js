import express from "express";

import { getUserbyId, updateUserById } from "../controllers/user.js";
import { verifyToken } from "../../middlewares/verifyToken.js";
import { checkServerHealth } from "../controllers/auth.js";

export const userRouter = express.Router();

userRouter.get("/health", checkServerHealth);

userRouter.get("/:id", getUserbyId);

userRouter.patch("/:id", verifyToken, updateUserById);
