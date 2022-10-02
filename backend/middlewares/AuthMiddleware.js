import asyncHandler from 'express-async-handler';
//Middleware
const isLogged = asyncHandler( async(req, res, next) => {
    req.user ? next() : res.sendStatus(401);
}) 

export {
    isLogged,
} 