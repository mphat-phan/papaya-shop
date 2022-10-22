import { check } from 'express-validator';
export const brandValidator = [
    check('name')
        .exists()
        .withMessage('Name not null'),
    check('name')
        .notEmpty()
        .withMessage('Name not empty'),
];
