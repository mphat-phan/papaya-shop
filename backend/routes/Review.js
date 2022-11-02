import express from "express";
import { createReview } from "../controllers/Review.js";

const router = express.Router();

router.route("/").post(createReview);

export default router;
