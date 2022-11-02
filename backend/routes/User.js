import express from "express";
import {
    registerUserWithEmail, 
    getUserByID, 
    getUserProfile, 
    getUsers, 
    loginUser, 
    updateUserByID, 
    updateUserProfile,
    changePassword,
} from '../controllers/User.js';
//Validator
import { runValidation } from "../validators/index.js";
import { userSignupValidator } from "../validators/auth.js";
import { protect, checkAdmin,} from "../middlewares/AuthMiddleware.js";
const router = express.Router();


router
    .route('/register')
    .post(userSignupValidator,runValidation,registerUserWithEmail);


router
    .route('/login')
    .post(userSignupValidator,runValidation,loginUser);

router
    .route('/')
    .get(protect, checkAdmin, getUsers);

router
    .route('/profile')
    .get(protect, getUserProfile)
    .put(protect, updateUserProfile);

router
    .route('/change-password')
    .put(protect, changePassword);

router
    .route('/:id')
    .get(protect, checkAdmin, getUserByID)
    .put(protect, checkAdmin, updateUserByID);
    
export default router;
