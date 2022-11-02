import express from "express";
import {
    createOrder,
    getMyOrder,
    getOrderById,
    getOrders,
} from '../controllers/Order';
import { protect, checkAdmin, } from "../middlewares/AuthMiddleware.js";

const router = express.Router();

router
    .route('/')
    .post(protect, createOrder)
    .get(protect, getOrders)

router
    .route('/me')
    .get(protect, getMyOrder)

router
    .route('/:id')
    .get(protect, getOrderById);

export default router;
