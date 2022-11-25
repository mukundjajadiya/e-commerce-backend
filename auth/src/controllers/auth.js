import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import bcrypt from "bcrypt";

import User from "../models/user.js";
import { PORT } from "../../index.js";

dotenv.config();

// CHECK SERVER HEALTH
export const checkServerHealth = async (req, res) => {
  res.status(200).json({
    status: "200 OK",
    message: `Auth server is running on port : ${PORT}`,
  });
};

// REGISTER USER
export const register = async (req, res) => {
  try {
    // get the user input
    const { first_name, last_name, email, password } = req.body;

    // validate user input
    if (!(email && password && first_name && last_name)) {
      return res.status(400).json({
        status: "400 Bad Request",
        message: "All inputs are required",
      });
    }

    // check if user already exist
    const oldUser = await User.findOne({ email });

    if (oldUser) {
      return res.status(409).json({
        status: "409 Conflict",
        message: "User Already Exist. Please Login",
      });
    }

    // encrypt user password
    const encryptedPassword = await bcrypt.hash(password, 10);

    // create user in database
    const user = await User.create({
      first_name,
      last_name,
      email: email.toLowerCase(),
      password: encryptedPassword,
    });

    // create token
    const token = jwt.sign(
      { user_id: user._id, email: user.email },
      process.env.JWT_SECRET,
      {
        expiresIn: "2h",
      }
    );

    // save user token
    user.token = token;
    user.save();

    // return sanitise user
    res.status(201).json({
      status: "201 Created",
      message: "User created successfully.",
      user: {
        id: user._id,
        token: user.token,
        first_name: user.first_name,
        last_name: user.last_name,
        email: user.email,
      },
    });
  } catch (error) {
    console.log(error.stack);
  }
};

// LOGIN USER
export const login = async (req, res) => {
  try {
    // get  user input
    const { email, password } = req.body;

    // validate user input
    if (!(email && password)) {
      return res.status(400).json({
        status: "400 Bad Request",
        message: "All inputs are required",
      });
    }

    // check if user  exist
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({
        status: "404 Not Found",
        message: "User not found.",
      });
    }

    // check if user authorized
    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!(user && passwordMatch)) {
      return res.status(401).json({
        status: "401 Unauthorized",
        message: "Invalid credentials.",
      });
    }

    // create token
    const token = jwt.sign(
      { user_id: user._id, email: user.email },
      process.env.JWT_SECRET,
      {
        expiresIn: "2h",
      }
    );

    // save user token
    user.token = token;
    user.save();

    // return sanitise user
    res.status(200).json({
      status: "200 OK",
      message: "User logged in successfully.",
      user: {
        id: user._id,
        token: user.token,
        first_name: user.first_name,
        last_name: user.last_name,
        email: user.email,
      },
    });
  } catch (error) {
    console.log(error.stack);
  }
};
