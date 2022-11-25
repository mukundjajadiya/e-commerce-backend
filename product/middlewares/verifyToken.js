import jwt from "jsonwebtoken";
import env from "dotenv";
import mongoose from "mongoose";
import axios from "axios";

import { getUserById } from "../utils/getUserById.js";

env.config();

export const verifyToken = async (req, res, next) => {
  try {
    const token = req.body.token || req.headers.authorization?.split(" ")[1];

    // check if token available
    if (!token) {
      return res.status(403).json({
        status: "403 Forbidden",
        message: "A token is required for authentication.",
      });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // match verified token with db token
    const user = await getUserById(decoded.user_id);

    if (!user) {
      return res.status(500).json({
        status: "500 Internal Server Error",
        message: "Internal Server Error.",
      });
    }

    if (token != user.token) {
      return res.status(403).json({
        status: "403 Forbidden",
        message: "You can not access resource.",
      });
    }

    req.user = decoded;

    return next();
  } catch (err) {
    // return invalid / expire token msg
    console.log(err.stack);
    return res.status(401).json({
      status: "401 Unauthorized",
      message: "Token is invalid or expired.",
    });
  }
};
