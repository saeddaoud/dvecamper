import asyncHandler from '../middleware/asyncHandler.js';
import ErrorResponse from '../utils/errorResponse.js';
import User from '../models/userModel.js';
import sendEmail from '../utils/sendEmail.js';

// @desc        Register a new user
// @route       POST /api/v1/auth/register
// @access      Public
const register = asyncHandler(async (req, res, next) => {
  const user = await User.create(req.body);
  sendTokenResponse(user, 200, res);
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

  sendTokenResponse(user, 200, res);
});

export { register, login };

// @desc        Get logged-in user
// @route       POST /api/v1/auth/me
// @access      Private
export const getLoggedInUser = asyncHandler(async (req, res, next) => {
  const user = await User.findById(req.user.id);
  res.status(200).json({
    success: true,
    data: user,
  });
});

// @desc        Forgot password
// @route       POST /api/v1/auth/forgotpassword
// @access      public
export const forgotPassword = asyncHandler(async (req, res, next) => {
  const user = await User.findOne({ email: req.body.email });

  if (!user) {
    return next(new ErrorResponse('There is no user with this email', 404));
  }

  const resetToken = user.getResetPasswordToken();

  await user.save({ validateBeforeSave: false });

  // Create reset url
  const resetUrl = `${req.protocol}://${req.get(
    'host'
  )}/api/v1/resetpassword/${resetToken}`;

  const message = `You have received this email because you or someone else requested to reset the password. Please put a PUT request to:
  ${resetUrl}
  `;

  try {
    await sendEmail({
      email: user.email,
      message,
      subject: 'Reset Password',
    });

    res.status(200).json({ success: true, data: 'Email sent' });
  } catch (error) {
    console.error(error);
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;

    await user.save({ validateBeforeSave: false });

    return next(new ErrorResponse("Email couldn't be sent", 500));
  }

  // res.status(200).json({
  //   success: true,
  //   data: user,
  // });
});

const sendTokenResponse = (user, statusCode, res) => {
  const token = user.getSignedJwtToken();

  const options = {
    expires: new Date(
      Date.now() + process.env.JWT_COOKIE_EXPIRE * 24 * 60 * 60 * 1000
    ),
    httpOnly: true,
  };

  if (process.env.NODE_ENV === 'production') {
    options.secure = true;
  }

  res.status(statusCode).cookie('token', token, options).json({
    success: true,
    token,
  });
};
