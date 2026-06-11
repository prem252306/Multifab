import express from "express";
import { loginAdmin, updateAdmin } from "../controllers/authController.js";

const router = express.Router();

router.post("/login", loginAdmin);
router.put("/update", updateAdmin);

export default router;