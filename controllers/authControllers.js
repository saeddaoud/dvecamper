import asyncHandler from '../middleware/asyncHandler.js';
import ErrorResponse from '../utils/ErrorResponse.js';
import User from '../models/userModel.js';

// @desc        Register a new user
// @route       POST /api/v1/auth/register
// @access      Public
const resgister = asyncHandler(async (req, res, next) => {
  res.json({ success: true });
});

export { resgister };
