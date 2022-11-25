import dotenv from "dotenv";

import User from "../models/user.js";
import { validateMongoDBId } from "../../utils/validateMongoDBId.js";

// UPDATE user by id
export const updateUserRollById = async (req, res) => {
  try {
    const { id } = req.params;

    const { is_admin } = req.body;

    const isValidId = await validateMongoDBId(id);

    // validate user id
    if (!isValidId) {
      return res.status(400).json({
        status: "400 Bad Request",
        message: "Provide valid id.",
      });
    }

    // validate req body
    if (!is_admin) {
      return res.status(400).json({
        status: "400 Bad Request",
        message: "All fields are required.",
      });
    }

    // update user
    const result = await User.updateOne({ _id: id }, { $set: { is_admin } });

    // check update result
    if (!result.modifiedCount > 0) {
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
        is_admin: updatedUser.is_admin,
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
