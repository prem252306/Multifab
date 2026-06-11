import express from "express";
import upload from "../middleware/uploadMiddleware.js";

import {
  applyCareer,
  getCareers,
  getCareerById,
  deleteCareer
} from "../controllers/careerController.js";

const router = express.Router();

// Test
router.get("/test", (req, res) => {
  res.send("Career Route Working");
});

// Apply Job
router.post(
  "/apply",
  upload.single("resume"),
  applyCareer
);

// Get All Applications
router.get("/", getCareers);

// Get Single Application
router.get("/:id", getCareerById);


// Delete Application
router.delete("/:id", deleteCareer);

export default router;  