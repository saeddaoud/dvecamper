import asyncHandler from '../middleware/asyncHandler.js';
import Bootcamp from '../models/bootcampModel.js';
import Review from '../models/reviewModel.js';
import ErrorResponse from '../utils/ErrorResponse.js';

// @desc        Get reviews
// @route       GET /api/v1/reviews
// @route       GET /api/v1/bootcamps/:bootcampId/reviews
// @access      Public
const getReviews = asyncHandler(async (req, res, next) => {
  if (req.params.bootcampId) {
    const reviews = await Review.find({ bootcamp: req.params.bootcampId });
    res.status(200).json({
      success: true,
      count: reviews.length,
      data: reviews,
    });
  } else {
    res.status(200).json(res.advancedResults);
  }
});

export { getReviews };
