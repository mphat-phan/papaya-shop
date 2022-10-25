import express from "express";
import userRoutes from "./User.js";
import productRoutes from "./Product.js";
import categoryRoutes from "./Category.js";

const router = express.Router();
router.use("/users", userRoutes);
router.use("/products", productRoutes);
router.use("/categorys", categoryRoutes);

export default router;
