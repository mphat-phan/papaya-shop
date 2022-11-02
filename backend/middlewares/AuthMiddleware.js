import asyncHandler from 'express-async-handler';
import jwt from 'jsonwebtoken';
import User from '../models/User.js';
//Middleware
const isLogged = asyncHandler( async(req, res, next) => {
    req.user ? next() : res.sendStatus(401);
}) 

//Check login with token
const protect = asyncHandler(async (req, res, next) => {
    let token;
  
    if (
        req.headers.authorization &&
        req.headers.authorization.startsWith('Bearer')
    ) {
      try {
        
        token = req.headers.authorization.split(' ')[1];

        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        req.user = await User.findById(decoded.id).select('-password');
        
        next();
        } catch (error) {
            console.error(error);
            res.status(401);
            throw new Error('Not authorized, token failed');
        }
    }
  
    if (!token) {
        res.status(401);
        throw new Error('Not authorized, no token is provided');
    }
});
  

const checkAdmin = (req, res, next) => {
    if (req.user && req.user.isAdmin) {
        next();
    } else {
        res.status(401);
        throw new Error('Not authorized, not admin');
    }
};
  

export {
    isLogged,
    protect,
    checkAdmin,
} 