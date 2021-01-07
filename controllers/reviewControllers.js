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
    const reviews = await Review.find({
      bootcamp: req.params.bootcampId,
    });

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

// @desc        Update a review
// @route       PUT /api/v1/reviews/:id
// @access      Private
const updateReview = asyncHandler(async (req, res, next) => {
  let review = await Review.findById(req.params.id);

  if (!review) {
    return next(new ErrorResponse('No review was found', 404));
  }

  // Check if the logged in user is the author of the review and whether he/she is an admin
  if (review.user.toString() !== req.user.id && req.user.role !== 'admin') {
    return next(new ErrorResponse('Not authorized', 401));
  }

  review = await Review.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });

  res.status(200).json({
    success: true,
    data: review,
  });
});

// @desc        Delete a review
// @route       DELETE /api/v1/reviews/:id
// @access      Private
const deleteReview = asyncHandler(async (req, res, next) => {
  const review = await Review.findById(req.params.id);

  if (!review) {
    return next(new ErrorResponse('No review was found', 404));
  }

  // Check if the logged in user is the author of the review and whether he/she is an admin
  if (review.user.toString() !== req.user.id && req.user.role !== 'admin') {
    return next(new ErrorResponse('Not authorized', 401));
  }

  await review.remove();

  res.status(200).json({
    success: true,
    data: {},
  });
});

export { getReviews, getReview, addReview, updateReview, deleteReview };
