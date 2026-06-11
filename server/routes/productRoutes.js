import express from "express";
import upload from "../middleware/uploadMiddleware.js";

import {
  getProducts,
  addProduct,
  deleteProduct,
   updateProduct
} from "../controllers/productController.js";

const router = express.Router();

router.get("/", getProducts);

router.post(
  "/",
  upload.single("image"),
  addProduct
);

router.delete(
  "/:id",
  deleteProduct
);
router.put(
  "/:id",
  upload.single("image"),
  updateProduct
);
export default router;