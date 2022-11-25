import jwt from "jsonwebtoken";
import env from "dotenv";
import User from "../src/models/user.js";

env.config();

export const verifyToken = async (req, res, next) => {
  const token = req.body.token || req.headers.authorization?.split(" ")[1];

  // check if token available
  if (!token) {
    return res.status(403).json({
      status: "403 Forbidden",
      message: "A token is required for authentication.",
    });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // match verified token with db token
    const user = await User.findOne({ email: decoded.email });

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
    console.log(err.message);
    return res.status(401).json({
      status: "401 Unauthorized",
      message: "Token is invalid or expired.",
    });
  }
};
