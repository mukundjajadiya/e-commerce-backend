import mongoose from "mongoose";

export const validateProductId = (id) => {
  const ObjectId = mongoose.Types.ObjectId;
  return ObjectId.isValid(id);
};
