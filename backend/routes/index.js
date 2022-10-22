import express from 'express';
import userRoutes from './User.js';
import brandRoutes from './Brand.js';


const router = express.Router();
router.use('/users',userRoutes);
router.use('/brands',brandRoutes);



export default router;
