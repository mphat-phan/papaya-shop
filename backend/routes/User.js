import express from "express";
import {registerUser} from '../controllers/User.js';
//Validator
import { runValidation } from "../validators/index.js";
import { userSignupValidator } from "../validators/auth.js";

const router = express.Router();


/**
 * @desc    Create/Register a new user
 * @route   POST /api/users
 * @access  Private
 */
router
.route('/')
.post(userSignupValidator,runValidation,registerUser);

export default router;
