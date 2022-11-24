import Category from "../models/categoryModel.js";
import asyncHandler from "express-async-handler";
/**
 * @desc    Create a category
 * @route   POST /api/category
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
  if (req.query.option === "all") {
    const categorys = await Category.find({});
    res.json({ categorys });
  } else {
    const perPage = 12;
    const page = parseInt(req.query.pageNumber) || 1;

    const keyword = req.query.keyword
      ? {
          name: {
            $regex: req.query.keyword,
            $options: "i",
          },
        }
      : {};

    const count = await Category.countDocuments({ ...keyword });
    const categorys = await Category.find({ ...keyword })
      .limit(perPage)
      .skip(perPage * (page - 1));

    res.json({ categorys, page, pages: Math.ceil(count / perPage), count });
  }
});

/**
 * @desc    Get CategoryByID
 * @route   GET /api/categorys/:id
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
 * @route   DELETE /api/categorys/:id
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
 * @route   UPDATE /api/categorys/:id
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

