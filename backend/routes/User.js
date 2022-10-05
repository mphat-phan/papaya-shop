import express from "express";
import {registerUser} from '../controllers/User.js';

const router = express.Router();


/**
 * @desc    Create/Register a new user
 * @route   POST /api/users
 * @access  Private
 */
router
.route('/')
.post(registerUser);



export default router;
