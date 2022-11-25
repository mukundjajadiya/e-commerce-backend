import mongoose from "mongoose";

export const validateMongoDBId = async (id) => {
  const ObjectId = mongoose.Types.ObjectId;
  return ObjectId.isValid(id);
};
