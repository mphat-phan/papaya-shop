import express from 'express';
import userRoutes from './User.js';
import brandRoutes from './Brand.js';
import supplierRoutes from './Supplier.js';


const router = express.Router();
router.use('/users',userRoutes);
router.use('/brands',brandRoutes);
router.use('/suppliers',supplierRoutes);


export default router;
