import mongoose from "mongoose";

export const validateProductId = async (id) => {
  const ObjectId = mongoose.Types.ObjectId;
  return ObjectId.isValid(id);
};
