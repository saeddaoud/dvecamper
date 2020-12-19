import asyncHandler from '../middleware/asyncHandler.js';
import ErrorResponse from '../utils/errorResponse.js';
import User from '../models/userModel.js';

// @desc        Register a new user
// @route       POST /api/v1/auth/register
// @access      Public
const register = asyncHandler(async (req, res, next) => {
  const registeredUser = await User.create(req.body);
  const token = registeredUser.getSignedJwtToken();
  res.json({
    sucess: true,
    token,
  });
});

// @desc        Login a user
// @route       POST /api/v1/auth/login
// @access      Public
const login = asyncHandler(async (req, res, next) => {
  const { email, password } = req.body;

  // Check if email and passwords were provided
  if (!email || !password) {
    return next(new ErrorResponse('Please provide an email and password', 400));
  }

  // Check if user exists
  const user = await User.findOne({ email }).select('+password');
  if (!user) {
    return next(new ErrorResponse('Invalid credentials', 400));
  }

  // Check if passwords match
  const isMatch = await user.matchPassword(password);
  console.log(isMatch);
  if (!isMatch) {
    return next(new ErrorResponse('Invalid credentials', 400));
  }

  const token = user.getSignedJwtToken();
  res.json({
    sucess: true,
    token,
  });
});

export { register, login };
