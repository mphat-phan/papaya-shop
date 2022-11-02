import asyncHandler from 'express-async-handler';
import Order from '../models/Order.js';
import Product from '../models/Product.js';

// POST /api/orders
const createOrder = asyncHandler(async (req, res) => {

})

// GET /api/orders
const getOrders = asyncHandler(async (req, res) => {

})

// GET /api/orders/:id
const getOrderById = asyncHandler(async (req, res) => {

})

// GET /api/orders/me
const getMyOrder = asyncHandler(async (req, res) => {

})

export {
    createOrder,
    getMyOrder,
    getOrderById,
    getOrders
}


