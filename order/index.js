import express from "express";
import env from "dotenv";
import cors from "cors";

import { connect } from "./config/db.js";
import orderRouter from "./src/route.js";

env.config(); // .env config init

connect(); // connect mongo db

const app = express();

export const PORT = process.env.PORT || 8003;
const HOST = "0.0.0.0";

// middleware
app.use(express.json());
app.use(cors());

// routes
app.get("/", async (req, res) => {
  res.status(200).json({ status: "ok" });
});
app.use("/api/orders", orderRouter);

// not found route
app.use("*", async (req, res, next) => {
  res.status(404).json({
    status: "404 Not Found",
    message: `API route (${req.method} ${req.baseUrl}) not exist.`,
  });
});

// Error handling
app.use(async (err, req, res, next) => {
  console.log(err);

  res.status(500).json({
    status: "500 Internal Server Error",
    message: `Internal Server Error : ${err.message}`,
  });
});

// server configuration
app.listen(PORT, HOST, () => {
  console.log(`ORDER Service on http://localhost:${PORT} | ${HOST}:${PORT}`);
});
