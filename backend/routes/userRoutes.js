import express from 'express';
import {
  authUser,
  getUserProfile,
  registerUser,
  updateUserProfile,
  getUsers,
  deleteUser,
  getUserById,
  updateUser,
  verifyOTP,
  resendVerifyOTP
} from '../controllers/userController.js';
import { protect, checkAdmin } from '../middlewares/authMiddleware.js';

const router = express.Router();
//Register
router.route('/').post(registerUser).get(protect, checkAdmin, getUsers);
router.route('/verifyOTP').post(verifyOTP);
router.route('/resend-verify-otp').post(resendVerifyOTP);

//Login
router.post('/login', authUser);

router
  .route('/profile')
  .get(protect, getUserProfile)
  .put(protect, updateUserProfile);
router
  .route('/:id')
  .delete(protect, checkAdmin, deleteUser)
  .get(protect, checkAdmin, getUserById)
  .put(protect, checkAdmin, updateUser);


export default router;
