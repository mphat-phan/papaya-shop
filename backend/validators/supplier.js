import { check } from 'express-validator';
export const supplierValidator = [
    check('name')
        .exists()
        .withMessage('Name not null')
        .notEmpty()
        .withMessage('Name not empty'), 
];
