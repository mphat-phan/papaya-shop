import express from "express";
import {
  createCategory,
  getCategorys,
  deleteCategory,
  updateCategory,
  getCategoryById,
} from "../controllers/Category.js";

import { runValidation } from "../validators/index.js";
import { categoryValidator } from "../validators/product.js";

const router = express.Router();

router
  .route("/")
  .post(categoryValidator, runValidation, createCategory)
  .get(getCategorys);
router
  .route("/:id")
  .delete(deleteCategory)
  .put(categoryValidator, runValidation, updateCategory)
  .get(getCategoryById);

export default router;
