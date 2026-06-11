import dotenv from "dotenv";
import express from "express";
import cors from "cors";
import authRoutes from "./routes/authRoutes.js";
import productRoutes from "./routes/productRoutes.js";
import contactRoutes from "./routes/contactRoutes.js";
import careerRoutes from "./routes/careerRoutes.js";
import path from "path";
import dashboardRoutes from "./routes/dashboardRoutes.js";
import galleryRoutes from "./routes/galleryRoutes.js";
dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

app.use("/uploads", express.static("uploads"));

app.use("/api/auth", authRoutes);

// 👇 IMPORTANT (serve images)
app.use("/uploads", express.static("uploads"));
app.use("/api/products", productRoutes);
app.use("/api/contact", contactRoutes);
app.use("/api/career", careerRoutes);
app.use("/api/gallery", galleryRoutes);
app.use("/api/dashboard", dashboardRoutes);
console.log("Dashboard Route Loaded");
app.get("/test", (req, res) => {
  res.send("Test Working");
});
app.listen(5000, () => {
  console.log("Server Running On Port 5000");
});
app.get("/", (req, res) => {
  res.send("UNITEC Backend Running 🚀");
});