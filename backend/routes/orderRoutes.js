import express from 'express';
const router = express.Router();
import {
  addOrderItems,
  getOrderById,
  updateOrderToPaid,
  getMyOrders,
  getOrders,
  updateOrderToDelivered,
  getRevenueOfYear,
} from '../controllers/orderControllers.js';
import { protect, checkAdmin } from '../middlewares/authMiddleware.js';

router.route('/myorders').get(protect, getMyOrders);
router
  .route('/')
  .post(protect, addOrderItems)
  .get(protect, checkAdmin, getOrders);
router.route('/:id').get(protect, getOrderById);
router.route('/:id/pay').put(protect, updateOrderToPaid);
router.route('/:id/deliver').put(protect, checkAdmin, updateOrderToDelivered);
router.route('/revenue/:columm/:year').get(protect, checkAdmin, getRevenueOfYear);

export default router;
