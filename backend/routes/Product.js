import express from "express";
import { createProduct } from "../controllers/Product.js";

const router = express.Router();

router.route("/").post(createProduct);

export default router;
