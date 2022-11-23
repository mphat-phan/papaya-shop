import Category from "../models/categoryModel.js";
import asyncHandler from "express-async-handler";
/**
 * @desc    Create a category
 * @route   POST /api/products
 * @access  Private
 */
const createCategory = asyncHandler(async (req, res) => {
  const { name } = req.body;
  Category.findOne({ name }, (err, category) => {
    //
    if (category) {
      return res.status(400).json({
        error: "name Already Existed",
      });
    }

    //
    Category.create({ name }, (err, category) => {
      if (err) {
        return res.status(400).json({
          error: err,
        });
      }
      res.status(201).json({
        _id: category._id,
        name: category.name,
      });
    });
  });
});

/**
 * @desc    Get list category
 * @route   GET /api/categorys
 * @access  Private
 */
const getCategorys = asyncHandler(async (req, res) => {
  const categorys = await Category.find({});
  res.status(200).json(categorys);
});

/**
 * @desc    Get CategoryByID
 * @route   GET /api/products/:id
 * @access  Private
 */

const getCategoryById = asyncHandler(async (req, res) => {
  const category = await Category.findById(req.params.id);
  if (category) {
    res.status(201).json(category);
  } else {
    res.status(500).json({
      msg: "Category not found",
    });
  }
});

/**
 * @desc    Delete a Category
 * @route   DELETE /api/products/:id
 * @access  Private
 */
const deleteCategory = asyncHandler(async (req, res) => {
  const category = await Category.findById(req.params.id);
  if (category) {
    category.remove();
    res.status(200).json("Removed Successfully");
  } else {
    res.status(500).json({
      msg: "Category not found",
    });
  }
});

/**
 * @desc    Update a Category
 * @route   UPDATE /api/products/:id
 * @access  Private
 */
const updateCategory = asyncHandler(async (req, res) => {
  const { name } = req.body;
  const category = await Category.findById(req.params.id);
  if (category) {
    category.name = name || category.name;
    res.status(200).json("Updateed Successfully");
    await category.save();
  } else {
    res.status(500);
    throw new Error("Category not found");
  }
});

export {
  createCategory,
  getCategorys,
  getCategoryById,
  deleteCategory,
  updateCategory,
};

