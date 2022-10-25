import express from "express";
import {createSupplier, deleteSupplier, getSupplierByID, getSuppliers, updateSupplier} from '../controllers/Supplier.js';

//Validator
import { runValidation } from "../validators/index.js";
import { supplierValidator } from "../validators/supplier.js";

const router = express.Router();


/**
 * @desc    Create/Register a new user
 * @route   POST /api/brands
 * @access  Private
 */
router
.route('/')
.get(getSuppliers)
.post(supplierValidator, runValidation, createSupplier);



router
.route('/:id')
.get(getSupplierByID)
.delete(deleteSupplier)
.put(supplierValidator, runValidation,updateSupplier)


export default router;
