import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const { MONGO_URI, PORT: serverPort } = process.env;
export const PORT = serverPort || 8001;

export const connect = async () => {
  // Connecting to the database
  try {
    await mongoose.connect(MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log("Successfully connected to database");
  } catch (error) {
    console.log("database connection failed.");
    console.log(error);
  }
};
