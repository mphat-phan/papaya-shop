import User from '../models/User.js';
import asyncHandler from 'express-async-handler';

/**
 * @desc    Create/Register a new user
 * @route   POST /api/users
 * @access  Private
 */
const registerUser = asyncHandler(async (req, res) => {
    
    const {email, password} = req.body;

    User.findOne({ email }, (err, user)=>{
        //Check User Existed
        if(user){
            return res.status(400).json({
                error: 'User Already Existed'
            });
        }

        //Creat New User
        User.create({email, password}, (err, user) =>{
            if(err){
                return res.status(400).json({
                    error: err
                });
            }
            res.status(201).json({
                _id: user._id,
                email: user.email,
            });
        });

    });
})


export {
    registerUser,
};