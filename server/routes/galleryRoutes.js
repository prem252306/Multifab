import express from "express";
import upload from "../middleware/uploadMiddleware.js";

import {
  getGallery,
  addGallery,
  deleteGallery
} from "../controllers/galleryController.js";

const router = express.Router();

router.get("/", getGallery);

router.post(
  "/",
  upload.single("image"),
  addGallery
);

router.delete("/:id", deleteGallery);

export default router;