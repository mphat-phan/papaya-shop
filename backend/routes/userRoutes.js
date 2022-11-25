import express from 'express';
import {
  authUser,
  authAdmin,
  getUserProfile,
  registerUser,
  updateUserProfile,
  getUsers,
  deleteUser,
  getUserById,
  updateUser,
  verifyOTP,
  resendVerifyOTP,
  changePassword,
  forgotPassword,
  sendOTPPassword,
  updateUserPasword,
} from '../controllers/userController.js';
import { protect, checkAdmin } from '../middlewares/authMiddleware.js';

const router = express.Router();
//Register
router.route('/').post(registerUser).get(protect, checkAdmin, getUsers);    //Sau khi đăng ký gửi OTP
//Xác thực EMAIL
router.route('/verifyOTP').post(verifyOTP);                                 //Xác nhận OTP => Xác nhận email
router.route('/resend-verify-otp').post(resendVerifyOTP);                   //Resend OTP
//Đổi mật khẩu
router.route('/send-otp-password').post(sendOTPPassword);   //Gửi OTP
router.route('/forgot-password').post(forgotPassword);            //Xác nhận OTP , trả về token
router.route('/change-password').post(protect, changePassword);   //Đổi mật khẩu

//Login User
router.post('/login', authUser);
//Login Admin
router.post('/admin/login', authAdmin);

router
  .route('/profile')
  .get(protect, getUserProfile)
  .put(protect, updateUserProfile);

router
  .route('/profile/change-password')
  .put(protect, updateUserPasword);

router
  .route('/:id')
  .delete(protect, checkAdmin, deleteUser)
  .get(protect, checkAdmin, getUserById)
  .put(protect, checkAdmin, updateUser);


export default router;
