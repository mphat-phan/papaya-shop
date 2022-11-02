import User from '../models/User.js';
import asyncHandler from 'express-async-handler';
import generateToken from '../utils/generateToken.js';

//------------Login /Register---------------
/**
 * @desc    Create/Register a new user
 * @route   POST /api/users/register
 * @access  Private
 */
const registerUserWithEmail = asyncHandler(async (req, res) => {
    
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

/**
 * @desc   Login user
 * @route   POST /api/users/login
 * @access  Private
 */
const loginUser = asyncHandler(async (req, res) => {
    const { email, password} = req.body;
    const user = await User.findOne({ email });
    
    if (user && user.isStatus && (await user.matchPassword(password))) {
        res.json({
          _id: user._id,
          name: user.name,
          email: user.email,
          avatar : user.avatar,
          address : user.address,
          token: generateToken(user._id),
        });
    } 
    else {
        if(user.isStatus === false){
            res.status(401).json({
                error: 'User has blocked'
            });
        }
        else{
            res.status(401).json({
                error: 'Invalid email or password!'
            });
        }
        
    }
});

//--------------Admin-------------
/**
 * @desc    Get all users
 * @route   GET /api/users
 * @access  Private/Admin
 */
const getUsers = asyncHandler(async (req, res) => {
    User.find({}, (err, users) => {
        if(err){
            return res.status(400).json({
                error: 'Error'
            });
        }
        res.status(201).json({
            users
        });
    });
});

/**
 * @desc    Update user by ID
 * @route   PUT /api/users/:id
 * @access  Private/Admin
 */
const updateUserByID = asyncHandler(async (req, res) => {

});

/**
 * @desc    Get user by ID
 * @route   GET /api/users/:id
 * @access  Private/Admin
 */
const getUserByID = asyncHandler(async (req, res) => {

});

//-----------------User-----------------
/**
 * @desc    Update user info
 * @route   PUT /api/users/profile
 * @access  Private
 */
const updateUserProfile = asyncHandler(async (req, res) => {
    const {_id} = req.body;
    const user = await User.findById(_id);

    if(user){
        const {name, avatar, address} = req.body;
        user.name = name || user.name;
        user.avatar = avatar || user.avatar;
        user.address = address || user.address;
    }
    const updatedUser = await user.save();
    res.status(201).json({
        _id: updatedUser._id,
        name: updatedUser.name,
        avatar: updatedUser.avatar,
        address: updatedUser.address,
        isStatus: updatedUser.isStatus,
    })
});

/**
 * @desc    Get user info
 * @route   GET /api/users/profile
 * @access  Private
 */
const getUserProfile = asyncHandler(async (req, res) => {
    
    const {_id} = req.user;
    const user = await User.findById(_id).select('-password');

    if(user){
        res.json(user);
    }
    else{
        res.status(404).json({
            error: 'User Not Found',
        });
    }
});


/**
 * @desc    change Password
 * @route   GET /api/users/changePassword
 * @access  Private
 */
const changePassword = asyncHandler(async (req, res) => {
    const {_id, password} = req.body;
    const user = await User.findById(_id);
    if(user && password){
        user.password = password;
        await user.save();
        res.status(201).json({
            message : 'Change password successfully'
        })
    }
    else{
        res.status(401).json({
            error : 'Invalid password'
        })
    }
    
})

export {
    registerUserWithEmail,
    getUserByID,
    getUserProfile,
    getUsers,
    loginUser,
    updateUserByID,
    updateUserProfile,
    changePassword,
};