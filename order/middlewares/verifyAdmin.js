import jwt from "jsonwebtoken";
import env from "dotenv";
import mongoose from "mongoose";
import axios from "axios";

import { getUserById } from "../utils/getUserById.js";

env.config();

export const verifyAdmin = async (req, res, next) => {
  try {
    const { user_id } = req.user;
    const user = await getUserById(user_id);

    if (!user.is_admin) {
      return res.status(403).json({
        status: "403 Forbidden",
        message: "You can not perform this action.",
      });
    }

    return next();
  } catch (err) {
    // return invalid / expire token msg
    console.log(err.message);
    return res.status(403).json({
      status: "403 Forbidden",
      message: "You can not perform this action.",
    });
  }
};
