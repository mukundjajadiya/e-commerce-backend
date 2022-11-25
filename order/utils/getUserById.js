import jwt from "jsonwebtoken";
import env from "dotenv";
import mongoose from "mongoose";
import axios from "axios";

env.config();

export const getUserById = async (user_id) => {
  try {
    const { USERS_SERVICE_URL } = process.env;

    // FIND USER
    const { data } = await axios.get(`${USERS_SERVICE_URL}/${user_id}`);

    const user = data?.user;

    if (user) return user;
    
  } catch (err) {
    // return axios error msg
    console.log(err.message);
  }
};
