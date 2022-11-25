import dotenv from "dotenv";

import User from "../models/user.js";
import { validateMongoDBId } from "../../utils/validateMongoDBId.js";

dotenv.config();

// GET user by id
export const getUserbyId = async (req, res) => {
  try {
    const { id } = req.params;
    const isValidId = await validateMongoDBId(id);

    // validate user id
    if (!isValidId) {
      return res.status(400).json({
        status: "400 Bad Request",
        message: "Provide valid user id.",
      });
    }

    const foundUser = await User.findOne({ _id: id });

    // check user found
    if (!foundUser) {
      return res.status(400).json({
        status: "404 Not Found",
        message: `User with id ${id} not exist.`,
      });
    }

    // return founded user
    return res.status(200).json({
      status: "200 OK",
      message: `User with id ${id} fetch successfully.`,
      user: foundUser,
    });
  } catch (error) {
    console.log(error.stack);

    return res
      .status(500)
      .json({ status: "500 Server Error", message: "Internal server error." });
  }
};

// UPDATE user by id
export const updateUserById = async (req, res) => {
  try {
    const { id } = req.params;

    const { first_name, last_name, email } = req.body;

    const isValidId = await validateMongoDBId(id);

    // validate user id
    if (!isValidId) {
      return res.status(400).json({
        status: "400 Bad Request",
        message: "Provide valid id.",
      });
    }

    // validate user body data
    if (!first_name || !last_name || !email) {
      return res.status(400).json({
        status: "400 Bad Request",
        message: "All fields are required.",
      });
    }

    // validate email is not exist in db.
    const existUserWithEmail = await User.findOne({ email });

    if (existUserWithEmail) {
      return res.status(409).json({
        status: "409 Conflict",
        message: `User with email id ${email} already register, Please login.`,
      });
    }

    // update user
    const result = await User.updateOne(
      { _id: id },
      { $set: { first_name, last_name, email } }
    );

    // check update result
    if (!result) {
      return res.status(400).json({
        status: "400 Bad Request",
        message: `Unable to update user with id ${id}`,
      });
    }

    // find updated user from db
    const updatedUser = await User.findOne({ _id: id });

    // return updated user
    return res.status(200).json({
      status: "200 OK",
      message: `User with id (${id}) update successfully.`,
      user: {
        id: updatedUser._id,
        first_name: updatedUser.first_name,
        last_name: updatedUser.last_name,
        email: updatedUser.email,
      },
    });
  } catch (error) {
    console.log(error.stack);
    return res
      .status(500)
      .json({ status: "500 Server Error", message: "Internal server error." });
  }
};
