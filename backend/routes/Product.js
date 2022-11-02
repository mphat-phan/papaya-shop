import express from "express";
import { getProducts, createProduct } from "../controllers/Product.js";

const router = express.Router();

router.route("/").get(getProducts).post(createProduct);

export default router;
