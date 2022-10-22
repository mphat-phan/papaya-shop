import express from "express";
import {createBrand, deleteBrand, getBrandByID, getBrands, updateBrand} from '../controllers/Brand.js';

//Validator
import { runValidation } from "../validators/index.js";
import { brandValidator } from "../validators/brand.js";

const router = express.Router();


/**
 * @desc    Create/Register a new user
 * @route   POST /api/brands
 * @access  Private
 */
router
.route('/')
.get(getBrands)
.post(brandValidator, runValidation, createBrand);



router
.route('/:id')
.get(getBrandByID)
.delete(deleteBrand)
.put(brandValidator, runValidation,updateBrand)


export default router;
