import User from '../models/UserModel.js';
import asyncHandler from 'express-async-handler';

/**
 * @desc    Create/Register a new user
 * @route   POST /api/users
 * @access  Private
 */
const registerUser = asyncHandler(async (req, res) => {
    console.log(req.body);
    const {email, password, rePassword} = req.body;
    const checkUserExist = await User.findOne({ email });

    if(checkUserExist){
        res.status(400);
        throw new Error ('User Already Existed');
    }

    const _user = await User.create({
        email,
        password,
    });

    if(_user) {
        res.status(201).json({
            _id: _user._id,
            email: _user.email,
        });
    }
    else {
        res.status(400);
        throw new Error('Invalid User');
    }

})


export {
    registerUser,
};