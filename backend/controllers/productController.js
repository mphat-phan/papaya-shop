import Product from '../models/productModel.js';
import Order from '../models/orderModel.js';
import asyncHandler from 'express-async-handler';

/**
 * @desc    Fetch all products
 * @route   GET /api/products
 * @access  Public
 */
const getProducts = asyncHandler(async (req, res) => {
  if (req.query.option === 'all') {
    const products = await Product.find({});
    res.json({ products });
  } else {
    const perPage = 12;
    const page = parseInt(req.query.pageNumber) || 1;

    const keyword = req.query.keyword
      ? {
          name: {
            $regex: req.query.keyword,
            $options: 'i',
          },
        }
      : {};

    const count = await Product.countDocuments({ ...keyword });
    const products = await Product.find({ ...keyword })
      .limit(perPage)
      .skip(perPage * (page - 1));

    res.json({ products, page, pages: Math.ceil(count / perPage), count });
  }
});

/**
 * @desc    Fetch single product
 * @route   GET /api/products/:id
 * @access  Public
 */
const getProductById = asyncHandler(async (req, res) => {
  const products = await Product.findById(req.params.id);
  if (products ) {
    res.json(products);
  } else {
    res.status(404).json({
      message: 'Product not found',
    });
  }
});

// @desc    Delete a product
// @route   DELETE /api/products/:id
// @access  Private/Admin
const deleteProduct = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);

  if (product) {
    await product.remove();
    res.json({ message: 'Product removed' });
  } else {
    res.status(404);
    throw new Error('Product not found');
  }
});

// @desc    Create a product
// @route   POST /api/products
// @access  Private/Admin

const createProduct = asyncHandler(async (req, res) => {
  const product = new Product({ ...req.body, user: req.user._id });

  const createdProduct = await product.save();
  res.status(201).json(createdProduct);
});

// @desc    Update a product
// @route   PUT /api/products/:id
// @access  Private/Admin
const updateProduct = asyncHandler(async (req, res) => {
  const {
    name,
    price,
    sale,
    images,
    brand,
    category,
    description,
    countInStock,
  } = req.body;

  const product = await Product.findById(req.params.id);

  if (product) {
    product.name = name || product.name;
    product.price = price || product.price;
    product.sale = sale || product.sale;
    product.description = description || product.description;
    product.images = images || product.images;
    product.brand = brand || product.brand;
    product.category = category || product.category;
    product.countInStock = countInStock || product.countInStock;

    const updatedProduct = await product.save();
    res.json(updatedProduct);
  } else {
    res.status(404);
    throw new Error('Product not found');
  }
});

// @desc    Create new review
// @route   POST /api/products/:id/reviews
// @access  Private
const createProductReview = asyncHandler(async (req, res) => {
  const { rating, comment, avatar, orderID, orderItem, userId, name } = req.body;
  const product = await Product.findById(req.params.id);
  if (product) {

    const review = {
      name: name,
      rating: Number(rating),
      comment,
      user: userId,
      avatar
    };

    product.reviews.push(review);

    product.numReviews = product.reviews.length;

    product.rating =
      product.reviews.reduce((acc, item) => item.rating + acc, 0) /
      product.reviews.length;

    console.log(product);

    await product.save();
    await Order.updateOne(
    {
      '_id' : orderID,
      'orderItems._id' : orderItem
    },
    {
      $set: { 
        "orderItems.$.rating": rating,
        "orderItems.$.comment": comment,
      }
    });
    
    res.status(201).json({ message: 'Review added' });
  } else {
    res.status(404);
    throw new Error('Product not found');
  }
});

// @desc    Create new review
// @route   POST /api/products/:id/reply/reviews
// @access  Private
const createReviewReply = asyncHandler(async (req, res) => {
  const { reply, reviewId } = req.body;
  const product = await Product.findById(req.params.id);

  if (product) {
    let replyUpdate = await Product.updateOne(
    {
      'reviews._id' : reviewId
    },
    {
      $set: { "reviews.$.reply": reply}
    });

    res.status(201).json({ message: 'Review added' });
  } else {
    res.status(404);
    throw new Error('Product not found');
  }
});


// @desc    Create new review
// @route   POST /api/products/:id/comments
// @access  Private
const createProductComment = asyncHandler(async (req, res) => {
  const { comment, avatar, name, id } = req.body;

  const product = await Product.findById(req.params.id);

  if (product) {

    const commentUser = {
      name: name,
      comment,
      user: id,
      avatar
    };

    product.comments.push(commentUser);

    product.numComments = product.comments.length;

    await product.save();
    res.status(201).json({ message: 'Bình luận đã được thêm vào' });
  } else {
    res.status(404);
    throw new Error('Không tìm thấy sản phẩm');
  }
});

// @desc    Create new review
// @route   POST /api/products/:id/reply
// @access  Private
const createCommentReply = asyncHandler(async (req, res) => {
  const { reply, avatar, commentId } = req.body;
  const product = await Product.findById(req.params.id);

  if (product) {

    const replyUser = {
      name: req.user.name,
      reply,
      user: req.user._id,
      avatar,
    };
    console.log(replyUser);
    let replyUpdate = await Product.updateOne(
    {
      'comments._id' : commentId
    },
    {
      $push: { "comments.$.reply": replyUser}
    });
    
    res.status(201).json({ message: 'Bình luận đã được thêm vào' });
  } else {
    res.status(404);
    throw new Error('Không tìm thấy sản phẩm');
  }
});

// @desc    Get top rated products
// @route   GET /api/products/top
// @access  Public
const getTopProducts = asyncHandler(async (req, res) => {
  const perPage = parseInt(req.query.perPage) || 12;
  const page = parseInt(req.query.pageNumber) || 1;
  const count = await Product.countDocuments({});
  const products = await Product.find({})
    .sort({ rating: -1 })
    .limit(perPage)
    .skip(perPage * (page - 1));

  res.json({ page, pages: Math.ceil(count / perPage), products, count });
});

/**
 * @desc    Get latest products
 * @route   GET /api/products/latest
 * @access  Public
 */
const getLatestProducts = asyncHandler(async (req, res) => {
  const perPage = 12;
  const page = parseInt(req.query.pageNumber) || 1;
  const count = await Product.countDocuments({});

  const products = await Product.find({})
    .sort({ createdAt: 'desc' })
    .limit(perPage)
    .skip(perPage * (page - 1));

  res.json({ page, pages: Math.ceil(count / perPage), products, count });
});

/**
 * @desc    Get sale products
 * @route   GET /api/products/sale
 * @access  Public
 */
const getSaleProducts = asyncHandler(async (req, res) => {
  const perPage = 12;
  const page = parseInt(req.query.pageNumber) || 1;
  const count = await Product.countDocuments({ sale: { $gt: 0 } });

  const products = await Product.find({ sale: { $gt: 0 } })
    .sort({ sale: 'desc' })
    .limit(perPage)
    .skip(perPage * (page - 1));

  res.json({ page, pages: Math.ceil(count / perPage), products, count });
});

/**
 * @desc    Get related products
 * @route   GET /api/products/sale
 * @access  Public
 */
const getRelatedProducts = asyncHandler(async (req, res) => {
  const category = req.query.category || 'clothes';
  const perPage = 4;
  const page = req.query.pageNumber || 1;
  const count = await Product.countDocuments({ category });

  const products = await Product.find({ category })
    .limit(perPage)
    .skip(perPage * (page - 1));

  res.json({ page, pages: Math.ceil(count / perPage), products });
});

/**
 * @desc    Get products sort by price
 * @route   GET /api/products/price
 * @access  Public
 */
const getSortByPriceProducts = asyncHandler(async (req, res) => {
  const sortBy = req.query.sortBy || 'asc';

  const perPage = 12;
  const page = parseInt(req.query.pageNumber) || 1;
  const skipCount = perPage * (page - 1);
  const count = await Product.countDocuments({});

  const products = await Product.aggregate([
    {
      $project: {
        // _id: 1,
        price: 1,
        sale: 1,
        images: 1,
        rating: 1,
        numReviews: 1,
        name: 1,
        brand: 1,
        category: 1,
        description: 1,
        user: 1,
        reviews: 1,
        createdAt: 1,
        updatedAt: 1,
        priceSale: {
          $subtract: ['$price', { $multiply: ['$price', '$sale', 0.01] }],
        },
      },
    },
    { $sort: { priceSale: sortBy === 'asc' ? 1 : -1 } },
    { $skip: skipCount },

    { $limit: perPage },
  ]);

  res.json({ page, pages: Math.ceil(count / perPage), products, count });
});

export {
  getProducts,
  getProductById,
  deleteProduct,
  createProduct,
  updateProduct,
  createProductReview,
  getTopProducts,
  getLatestProducts,
  getSaleProducts,
  getRelatedProducts,
  getSortByPriceProducts,
  createProductComment,
  createCommentReply,
  createReviewReply
};
