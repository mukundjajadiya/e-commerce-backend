import express from "express";
import env from "dotenv";
import cors from "cors";

import { connect } from "./config/db.js";
import { authRouter, userRouter, adminRouter } from "./src/routes/index.js";
import { verifyToken } from "./middlewares/index.js";

env.config();

connect();

const app = express();

export const PORT = process.env.PORT || 8001;
const HOST = "0.0.0.0";

// middleware
app.use(express.json());
app.use(cors());

// routes
app.get("/", async (req, res) => {
  res.status(200).json({ status: "ok" });
});
app.use("/api/users/auth", authRouter);
app.use("/api/users", userRouter);
app.use("/api/users/admin", adminRouter);

// not found route
app.use("*", async (req, res, next) => {
  res.status(404).json({
    status: "404 Not Found",
    message: `API route (${req.method} ${req.baseUrl}) not exist.`,
  });
});

// Error handling
app.use(async (err, req, res, next) => {
  console.log(err.message);

  res.status(500).json({
    status: "500 Internal Server Error",
    message: `Internal Server Error : ${err.message}`,
  });
});

// server configuration
app.listen(PORT, HOST, async () => {
  console.log(`AUTH Service on http://localhost:${PORT} | ${HOST}:${PORT}`);
});
