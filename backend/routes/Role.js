import express from "express";
import {
    createRole,
    deleteRole,
    getRoleByID,
    getRoles,
    updateRole
} from '../controllers/Role.js';
import { protect, checkAdmin,} from "../middlewares/AuthMiddleware.js";

const router = express.Router();

router
    .route('/')
    .get(getRoles)
    .post(protect, checkAdmin, createRole)
    .put(protect, checkAdmin, updateRole)
    .delete(protect, checkAdmin, deleteRole)

router
    .route('/:id')
    .get(getRoleByID);

export default router;
