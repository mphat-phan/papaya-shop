import express from "express";
import userRoutes from "./User.js";
import productRoutes from "./Product.js";
import categoryRoutes from "./Category.js";
import brandRoutes from "./Brand.js";
import supplierRoutes from "./Supplier.js";
import reviewRoutes from "./Review.js";

const router = express.Router();
router.use("/users", userRoutes);
router.use("/products", productRoutes);
router.use("/categorys", categoryRoutes);
router.use("/brands", brandRoutes);
router.use("/reviews", reviewRoutes);
router.use("/suppliers", supplierRoutes);
export default router;
