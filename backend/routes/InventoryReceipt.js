import express from "express";
import {
    createInventory,
    updateInventory
} from '../controllers/InventoryReceipt.js'

import { protect, checkAdmin, } from "../middlewares/AuthMiddleware.js";

const router = express.Router();

router
    .route('/')
    .post(protect, checkAdmin, createInventory)
    .delete(protect, checkAdmin);

export default router;
