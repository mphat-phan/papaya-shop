import Product from "../models/Product.js";
import asyncHandler from "express-async-handler";

const createProduct = asyncHandler(async (req, res) => {
  const product = new Product({ ...req.body });

  const createdProduct = await product.save();
  res.status(201).json(createdProduct);
  res.status(404).json({
    msg: "Khong tim thay san pham",
  });
});

const getProducts = asyncHandler(async (req, res) => {
  const product = new Product({ ...req.body });

  const createdProduct = await product.save();
  res.status(201).json(createdProduct);
  res.status(404).json({
    msg: "Khong tim thay san pham",
  });
});

export { createProduct, getProducts };
