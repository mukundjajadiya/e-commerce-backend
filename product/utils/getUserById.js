import env from "dotenv";
import axios from "axios";

env.config();

export const getUserById = async (user_id) => {
  try {
    const { USERS_SERVICE_URL } = process.env;
    // FIND USER
    const {
      data: { user },
    } = await axios.get(`${USERS_SERVICE_URL}/${user_id}`);
    if (user) return user;
  } catch (err) {
    // return axios error msg
    console.log(err.stack);
    console.log("[ERROR]", err.message);
  }
};
