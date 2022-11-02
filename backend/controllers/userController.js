import User from '../models/userModel.js';
import asyncHandler from 'express-async-handler';
import generateToken from '../utils/generateToken.js';

/**
 * @desc    Authenticate user & get token
 * @route   POST /api/users/login
 * @access  Public
 */
const authUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  // res.send(req.body);

  const user = await User.findOne({ email });

  if (user && user.isStatus && (await user.matchPassword(password))) {
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      isStatus: user.isStatus,
      avatar : user.avatar,
      address : user.address,
      city : user.city,
      postalCode : user.postalCode,
      country : user.country,
      token: generateToken(user._id),
    });
  } else {
    res.status(401);
    if(user.isStatus === false){
      throw new Error('You blocked'); 
    }
    else{
      throw new Error('Invalid email or password');
    }
    
  }
});

/**
 * @desc    Get user profile
 * @route   GET /api/users/profile
 * @access  Private
 */
const getUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);

  if (user) {
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      isStatus: user.isStatus,
      avatar : user.avatar,
      address : user.address,
      city : user.city,
      postalCode : user.postalCode,
      country : user.country,
    }); 
  } else {
    res.status(404);
    throw new Error('User not found');
  }
});

/**
 * @desc    Create a new user
 * @route   POST /api/users
 * @access  Public
 */
const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password, avatar, address, ctity, postalCode, country } = req.body;
  const userExist = await User.findOne({ email });

  if (userExist) {
    res.status(400);
    throw new Error('User already existed');
  }

  const user = await User.create({
    name,
    email,
    password,
    avatar, 
    address, 
    ctity, 
    postalCode, 
    country,
  });

  if (user) {
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      isStatus: user.isStatus,
      avatar : user.avatar,
      address : user.address,
      city : user.city,
      postalCode : user.postalCode,
      country : user.country,
    });
  } else {
    res.status(400);
    throw new Error('Invalid user data');
  }
});

/**
 * @desc    Update user profile
 * @route   PUT /api/users/profile
 * @access  Private
 */
const updateUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);

  if (user) {
    const { name, email, avatar,  address, city, postalCode, country } = req.body;
    user.name = name || user.name;
    user.email = email || user.email;
    user.avatar = avatar || user.avatar;
    user.address = address || user.address;
    user.city = city || user.city;
    user.postalCode = postalCode || user.postalCode;
    user.country = country || user.country;
    if (req.body.password) {
      user.password = req.body.password;
    }

    const updatedUser = await user.save();

    res.json({
      _id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
      isAdmin: updatedUser.isAdmin,
      isStatus: updatedUser.isStatus,
      avatar: updatedUser.avatar,
      address : user.address,
      city : user.city,
      postalCode : user.postalCode,
      country : user.country,
      token: generateToken(updatedUser._id),
    });

  } else {
      res.status(404);
      throw new Error('User not found');
  }
});

/**
 * @desc    Get all users
 * @route   GET /api/users
 * @access  Private/Admin only
 */
const getUsers = asyncHandler(async (req, res) => {
  const users = await User.find({});
  res.json(users);
});

/**
 * @desc    Get all users
 * @route   GET /api/users
 * @access  Private/Admin only
 */
const deleteUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);

  if (user) {
    user.isStatus = !user.isStatus;
    const updatedUser = await user.save();
    //await user.remove();
    res.json({ 
      message: 'User banned',
      _id : updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
      isAdmin: updatedUser.isAdmin,
      isStatus: updatedUser.isStatus,
      avatar: updatedUser.avatar,
    });
  } else {
    res.status(404);
    throw new Error('User not found');
  }
});

/**
 * @desc    Get user by Id
 * @route   GET /api/users/:id
 * @access  Private/Admin only
 */
const getUserById = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id).select('-password');

  if (user) {
    res.json(user);
  } else {
    res.status(404);
    throw new Error('User not found');
  }
});

/**
 * @desc    Update user
 * @route   PUT /api/users/:id
 * @access  Private/Admin only
 */
const updateUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id).select('-password');

  if (user) {
    const { name, email, isAdmin, avatar } = req.body;
    user.name = name || user.name;
    user.email = email || user.email;
    user.isAdmin = isAdmin;
    user.avatar = avatar || user.avatar;

    const updatedUser = await user.save();
    
    res.json({
      _id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
      isAdmin: updatedUser.isAdmin,
      isStatus: updatedUser.isStatus,
      avatar: updatedUser.avatar,
    });
  } else {
    res.status(404);
    throw new Error('User not found');
  }
});

export {
  authUser,
  getUserProfile,
  registerUser,
  updateUserProfile,
  getUsers,
  deleteUser,
  getUserById,
  updateUser,
};
