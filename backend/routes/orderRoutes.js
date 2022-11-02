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
  getTopProductMonthInYear,
  updateOrderToCancel,
  updateOrderToConfirm,
  updateOrderToDelivering,
} from '../controllers/orderControllers.js';
import { protect, checkAdmin, checkCustomer } from '../middlewares/authMiddleware.js';

router.route('/myorders').get(protect, getMyOrders);
router
  .route('/')
  .post(protect, checkCustomer, addOrderItems)
  .get(protect, checkAdmin, getOrders);
router.route('/:id').get(protect, getOrderById);
router.route('/:id/pay').put(protect, updateOrderToPaid);
router.route('/:id/deliver').put(protect, checkAdmin, updateOrderToDelivered);
router.route('/:id/cancel').put(protect, updateOrderToCancel);
router.route('/:id/delivering').put(protect, checkAdmin, updateOrderToDelivering);
router.route('/:id/confirm').put(protect, checkAdmin, updateOrderToConfirm);
router.route('/revenue/:columm/:year').get(protect, checkAdmin, getRevenueOfYear);
router.route('/:top/sellingProducts/:year/:month').get(protect, checkAdmin, getTopProductMonthInYear);

export default router;
