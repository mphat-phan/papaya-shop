import User from "../models/userModel.js";
import asyncHandler from "express-async-handler";
import generateToken from "../utils/generateToken.js";
import Verify from "../models/verifyModel.js";
import { transporter } from "../config/mailer.js";
import dotenv from "dotenv";
import { randomNumber } from "../utils/RandomNumber.js";
import { randomPassword } from "../utils/RandomPassword.js";
dotenv.config();

transporter.verify((error, success) => {
  if (error) {
    console.log(error);
  } else {
    console.log("Email is Ready");
  }
});

/**
 * @desc    Authenticate user & get token
 * @route   POST /api/users/login
 * @access  Public
 */
const authUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  // res.send(req.body);

  const user = await User.findOne({ email });
  console.log(user);
  if (user && user.isAdmin) {
    res.status(401);
    throw new Error("Can not login with admin user");
  }
  if (user && user.isStatus && (await user.matchPassword(password))) {
    //Nêu tài khoản chưa được xác thực thì sẽ gửi user
    if (!user.verified) {
      sendOTPVerify(
        {
          email: user.email,
        },
        res
      );
      return res.status(401).json({
        message: "Your account is not verified!!!!",
        verified: false,
      });
    }

    //Nêu tài khoản khoa
    if (user.isStatus === false) {
      throw new Error("You blocked");
    }

    //Nếu đăng nhập thành công
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      isStatus: user.isStatus,
      avatar: user.avatar,
      address: user.address,
      city: user.city,
      postalCode: user.postalCode,
      country: user.country,
      verified: user.verified,
      token: generateToken(user._id),
    });
  } else {
    res.status(401);
    throw new Error("Invalid email or password");
  }
});

/**
 * @desc    Authenticate user & get token
 * @route   POST /api/users/admin/login
 * @access  Public
 */
const authAdmin = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  // res.send(req.body);

  const user = await User.findOne({ email });
  if (user && !user.isAdmin) {
    res.status(401);
    throw new Error("Your account is not admin!!");
  }
  if (user && user.isStatus && (await user.matchPassword(password))) {
    //Nêu tài khoản chưa được xác thực thì sẽ gửi user
    if (!user.verified) {
      sendOTPVerify(
        {
          email: user.email,
        },
        res
      );
      return res.status(401).json({
        message: "Your account is not verified!!!!",
        verified: false,
      });
    }

    //Nêu tài khoản khoa
    if (user.isStatus === false) {
      throw new Error("You blocked");
    }

    //Nếu đăng nhập thành công
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      isStatus: user.isStatus,
      avatar: user.avatar,
      address: user.address,
      city: user.city,
      postalCode: user.postalCode,
      country: user.country,
      verified: user.verified,
      token: generateToken(user._id),
    });
  } else {
    res.status(401);
    throw new Error("Invalid email or password");
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
      avatar: user.avatar,
      address: user.address,
      city: user.city,
      postalCode: user.postalCode,
      country: user.country,
    });
  } else {
    res.status(404);
    throw new Error("User not found");
  }
});

/**
 * @desc    Create a new user
 * @route   POST /api/users
 * @access  Public
 */
const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;

  //Check exist
  const userExist = await User.findOne({ email });
  if (userExist) {
    res.status(400);
    throw new Error("User already existed");
  }

  //Create user
  const user = await User.create({
    name,
    email,
    password,
  });

  //Send OTP
  sendOTPVerify(
    {
      email: user.email,
    },
    res
  );

  if (user) {
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      isStatus: user.isStatus,
      avatar: user.avatar,
      address: user.address,
      city: user.city,
      postalCode: user.postalCode,
      country: user.country,
    });
  } else {
    res.status(400);
    throw new Error("Invalid user data");
  }
});
///Send OTP
const sendOTPVerify = async ({ email }, res) => {
  try {
    //Random otp
    const otp = randomNumber(1000, 9999);
    await Verify.deleteMany({ email });
    const mailOptions = {
      from: process.env.AUTH_EMAIL,
      to: email,
      subject: "Verify your email",
      html: `<p>
        Enter ${otp} to verify your email in Papaya Shop Website
        </br>
        This OTP will expire in 1 hours
      </p>`,
    };

    //Create database verify
    const verify = await Verify.create({
      email,
      otp,
    });

    //Send email with otp
    await transporter.sendMail(mailOptions);

    //If success
    // res.json({
    //   status: "PENDING",
    //   message: "Verification otp email sent",
    //   data: {
    //     email
    //   }
    // })
  } catch (error) {
    //Else Fail
    // res.json({
    //   status: "FAILED",
    //   message: error.message,
    // })
  }
};

/**
 * @desc    Create a new user
 * @route   POST /api/users/send-otp-password
 * @access  Public
 */
///Send Password
const sendOTPPassword = asyncHandler(async (req, res) => {
  const { email } = req.body;
  if (!email) {
    throw new Error("Invalid email");
  }
  const user = await User.findOne({ email });
  if (!user) {
    return res.json({
      message: "Your account is not existed",
    });
  } else {
    await Verify.deleteMany({ email });
    sendOTPVerify({ email }, res);
    return res.status(201).json({
      status: "SUCCESS",
      message: "Send Successfully",
    });
  }
});

/**
 * @desc    Create a new user
 * @route   POST /api/users/forgot-password
 * @access  Public
 */
const forgotPassword = asyncHandler(async (req, res) => {
  const { email, otp } = req.body;
  if (!email || !otp) {
    throw new Error("Invalid email or OTP");
  }
  //Kiem tra user
  const user = await User.findOne({ email });
  if (!user) {
    throw new Error("User is not existed");
  }
  const verify = await Verify.findOne({ email });
  if (verify && (await verify.matchOTP(otp))) {
    await Verify.deleteMany({ email });
    //Nếu đăng nhập thành công
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      status: "VERIFIED",
      token: generateToken(user._id),
    });
  } else {
    res.status(401).json({
      status: "NOT VERIFIED",
      message: "Not match otp",
    });
  }
});

/**
 * @desc    Create a new user
 * @route   POST /api/users/change-password
 * @access  PRIVATE
 */
const changePassword = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);

  if (user) {
    const { password } = req.body;
    user.password = password || user.password;

    const updatedUser = await user.save();

    res.json({
      status: "SUCCESS",
      message: "Password have changed successfully",
    });
  } else {
    res.status(404);
    throw new Error("User not found");
  }
});

/**
 * @desc    Update user profile
 * @route   PUT /api/users/verifyOTP
 * @access  Private
 */
const verifyOTP = asyncHandler(async (req, res) => {
  const { email, otp } = req.body;
  if (!email || !otp) {
    throw new Error("Invalid email or OTP");
  }
  //Kiem tra user
  const user = await User.findOne({ email });
  if (!user) {
    throw new Error("User is not existed");
  }

  if (user.verified) {
    throw new Error("User is verified");
  }

  const verify = await Verify.findOne({ email });

  if (verify && (await verify.matchOTP(otp))) {
    await Verify.deleteMany({ email });
    user.verified = true;
    await user.save();
    res.json({
      status: "VERIFIED",
      message: "User email verified successfully",
    });
  } else {
    res.status(401).json({
      status: "NOT VERIFIED",
      message: "Not match otp",
      verified: false,
    });
  }
});

/**
 * @desc    Update user profile
 * @route   PUT /api/users/resend-verify-otp
 * @access  Private
 */
const resendVerifyOTP = asyncHandler(async (req, res) => {
  const { email } = req.body;
  if (!email) {
    throw new Error("Invalid email");
  }

  const user = await User.findOne({ email });
  if (!user) {
    return res.json({
      message: "Your account is not existed",
    });
  }
  if (user.verified) {
    return res.json({
      message: "Your account is verified",
    });
  } else {
    await Verify.deleteMany({ email });
    sendOTPVerify({ email }, res);
    return res.status(201).json({
      message: "Resend Successfully",
    });
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
    const { name, email, avatar, address, city, postalCode, country } =
      req.body;
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
      address: user.address,
      city: user.city,
      postalCode: user.postalCode,
      country: user.country,
      token: generateToken(updatedUser._id),
    });
  } else {
    res.status(404);
    throw new Error("User not found");
  }
});

/**
 * @desc    Update user profile
 * @route   PUT /api/users/profile/change-password
 * @access  Private
 */
const updateUserPasword = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);
  const { password, oldPassword } = req.body;
  if (user && (await user.matchPassword(oldPassword))) {
  
    user.password = password || user.password;

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
      throw new Error('User not found or incorrect password!!!');
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
      message: "User banned",
      _id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
      isAdmin: updatedUser.isAdmin,
      isStatus: updatedUser.isStatus,
      avatar: updatedUser.avatar,
    });
  } else {
    res.status(404);
    throw new Error("User not found");
  }
});

/**
 * @desc    Get user by Id
 * @route   GET /api/users/:id
 * @access  Private/Admin only
 */
const getUserById = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id).select("-password");

  if (user) {
    res.json(user);
  } else {
    res.status(404);
    throw new Error("User not found");
  }
});

/**
 * @desc    Update user
 * @route   PUT /api/users/:id
 * @access  Private/Admin only
 */
const updateUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id).select("-password");

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
    throw new Error("User not found");
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
  verifyOTP,
  resendVerifyOTP,
  sendOTPPassword,
  forgotPassword,
  changePassword,
  authAdmin,
  updateUserPasword,
};
