import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  first_name: { type: String, required: true },
  last_name: { type: String, required: true },
  email: { type: String, unique: true, required: true },
  password: { type: String, required: true },
  token: { type: String },
  is_admin: { type: Boolean, required: true, default: false },
});

export default mongoose.model("user", userSchema);
