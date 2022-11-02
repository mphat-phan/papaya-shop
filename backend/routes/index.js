import express from 'express';
import userRoutes from './User.js';
import roleRoutes from './Role.js';
import orderRoutes from './Order.js';
import InventoryReceiptRoutes from './InventoryReceipt.js';

const router = express.Router();

router.use('/users', userRoutes);
router.use('/roles', roleRoutes);
router.use('/orders', orderRoutes);
router.use('/inventorys', InventoryReceiptRoutes);

export default router;
