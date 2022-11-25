import express from "express";

import { updateUserRollById } from "../controllers/admin.js";
import { verifyToken} from "../../middlewares/verifyToken.js";
import { verifyAdmin} from "../../middlewares/verifyAdmin.js";

export const adminRouter = express.Router();

adminRouter.patch("/:id", verifyToken, verifyAdmin, updateUserRollById);

