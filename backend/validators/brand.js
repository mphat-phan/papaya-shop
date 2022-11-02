import { check } from 'express-validator';
export const brandValidator = [
    check('name')
        .exists()
        .withMessage('Name not null')
        .notEmpty()
        .withMessage('Name not empty'), 
];
