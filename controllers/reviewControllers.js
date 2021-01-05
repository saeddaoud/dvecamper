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

// @desc        Get a review by id
// @route       GET /api/v1/reviews/:id
// @access      Public
const getReview = asyncHandler(async (req, res, next) => {
  const review = await Review.findById(req.params.id).populate(
    'bootcamp',
    'name description'
  );

  if (!review) {
    return next(ErrorResponse('No review found', 404));
  }

  res.status(200).json({
    success: true,
    data: review,
  });
});

// @desc        Create a review
// @route       POST /api/v1/bootcamps/:bootcampId/reviews
// @access      Private
const addReview = asyncHandler(async (req, res, next) => {
  req.body.bootcamp = req.params.bootcampId;
  req.body.user = req.user.id;

  const bootcamp = await Bootcamp.findById(req.params.bootcampId);

  if (!bootcamp) {
    return next(new ErrorResponse('No bootcamp was found', 404));
  }

  const review = await Review.create(req.body);

  res.status(201).json({
    success: true,
    data: review,
  });
});

export { getReviews, getReview, addReview };
