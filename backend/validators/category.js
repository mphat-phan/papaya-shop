import { check } from "express-validator";

export const categoryValidator = [
  check("name")
    .exists()
    .withMessage("Must be a valid category")
    .notEmpty()
    .withMessage("name not empty"),
];
