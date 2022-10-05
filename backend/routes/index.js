import express from 'express';
import userRoutes from './User.js';


const router = express.Router();
router.use('/users',userRoutes);



export default router;
