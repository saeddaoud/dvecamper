import asyncHandler from '../middleware/asyncHandler.js';
import Bootcamp from '../models/bootcampModel.js';
import ErrorResponse from '../utils/ErrorResponse.js';
import geocoder from '../utils/geocoder.js';
// @desc        Get all bootcamps
// @route       GET /api/v1/bootcamps
// @access      Public
const getBootcamps = asyncHandler(async (req, res, next) => {
  let queryStr = JSON.stringify(req.query);
  queryStr = queryStr.replace(
    /\b(gt|gte|lt|lte|in)\b/g,
    (match) => `$${match}`
  );
  const bootcamps = await Bootcamp.find(JSON.parse(queryStr));
  res.status(200).json({
    success: true,
    count: bootcamps.length,
    data: bootcamps,
  });
});

// @desc        Get bootcamp by id
// @route       GET /api/v1/bootcamps/:id
// @access      Public
const getBootcamp = asyncHandler(async (req, res, next) => {
  const bootcamp = await Bootcamp.findById(req.params.id);
  // This if statement handles the caes when the id is a valid ObjectId by there is no bootcamp with that id. The catch block deals with the case where the id is not a valid ObjectId
  if (!bootcamp) {
    return next(
      new ErrorResponse(`Bootcamp with id ${req.params.id} not found`, 404)
    );
  }
  res.status(200).json({
    success: true,
    data: bootcamp,
  });
});

// @desc        Create a new bootcamp
// @route       POST /api/v1/bootcamps
// @access      Private
const createBootcamp = asyncHandler(async (req, res, next) => {
  const bootcamp = await Bootcamp.create(req.body);
  res.status(201).json({
    success: true,
    data: bootcamp,
  });
});

// @desc        Update bootcamp
// @route       PUT /api/v1/bootcamps/:id
// @access      Private
const updateBootcamp = asyncHandler(async (req, res, next) => {
  const updatedBootcamp = await Bootcamp.findByIdAndUpdate(
    req.params.id,
    req.body,
    {
      new: true,
      runValidators: true,
    }
  );

  if (!updatedBootcamp) {
    return next(
      new ErrorResponse(`Bootcamp with id ${req.params.id} not found`, 404)
    );
  }

  res.status(200).json({ success: true, data: updatedBootcamp });
});

// @desc        Delete bootcamp
// @route       DELETE /api/v1/bootcamps/:id
// @access      Private
const deleteBootcamp = asyncHandler(async (req, res, next) => {
  const deletedBootcamp = await Bootcamp.findByIdAndDelete(req.params.id);

  if (!deletedBootcamp) {
    return next(
      new ErrorResponse(`Bootcamp with id ${req.params.id} not found`, 404)
    );
  }

  res.status(200).json({ success: true, data: {} });
});

// @desc        Get bootcamps within a radius
// @route       GET /api/v1/bootcamps/radius/:zipcode/:distance
// @access      Public
const getBootcampsInRadius = asyncHandler(async (req, res, next) => {
  const { zipcode, distance } = req.params;

  const loc = await geocoder.geocode(zipcode);
  const lat = loc[0].latitude;
  const lng = loc[0].longitude;
  const radius = distance / 3963; //3963 is the Earth's radius

  const bootcamps = await Bootcamp.find({
    location: { $geoWithin: { $centerSphere: [[lng, lat], radius] } },
  });

  res.json({
    success: true,
    count: bootcamps.length,
    data: bootcamps,
  });
});

export {
  getBootcamps,
  getBootcamp,
  updateBootcamp,
  createBootcamp,
  deleteBootcamp,
  getBootcampsInRadius,
};
