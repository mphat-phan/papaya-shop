import express from 'express';
const router = express.Router();

import { 
  addReceiptItems,
  deleteReceiptById,
  getReceiptById,
  getReceipts,
  updateReceiptById,
  updateReceiptToDelivered 
} from '../controllers/receiptController.js';

import { protect, checkAdmin } from '../middlewares/authMiddleware.js';

router
  .route('/')
  .post(protect,checkAdmin, addReceiptItems)
  .get(protect, checkAdmin, getReceipts);

  router
  .route('/:id')
  .put(protect,checkAdmin, updateReceiptById)
  .get(protect, checkAdmin, getReceiptById)
  .delete(protect, checkAdmin, deleteReceiptById);

router  
  .route('/:id/deliverd').put(protect, checkAdmin, updateReceiptToDelivered);

export default router;