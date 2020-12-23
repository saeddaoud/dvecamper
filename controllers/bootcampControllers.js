import path from 'path';
import asyncHandler from '../middleware/asyncHandler.js';
import Bootcamp from '../models/bootcampModel.js';
import ErrorResponse from '../utils/ErrorResponse.js';
import geocoder from '../utils/geocoder.js';
// @desc        Get all bootcamps
// @route       GET /api/v1/bootcamps
// @access      Public
const getBootcamps = asyncHandler(async (req, res, next) => {
  res.status(200).json(res.advancedResults);
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
  // Check if the logged in user is not an admin, and has already published a bootcamp. If yes, return an error message. Else, create the bootcamp

  const publishedBootcamp = await Bootcamp.findOne({ user: req.user.id });
  if (publishedBootcamp && req.user.role !== 'admin') {
    return next(
      new ErrorResponse(
        'User has already published the limit of one bootcamp',
        400
      )
    );
  }

  const bootcamp = await Bootcamp.create({ user: req.user.id, ...req.body });
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
  const deletedBootcamp = await Bootcamp.findById(req.params.id);

  if (!deletedBootcamp) {
    return next(
      new ErrorResponse(`Bootcamp with id ${req.params.id} not found`, 404)
    );
  }

  deletedBootcamp.remove();

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

// @desc        Upload photo
// @route       PUT /api/v1/bootcamps/:id/photo
// @access      Private
const bootcampPhotoUpload = asyncHandler(async (req, res, next) => {
  const bootcamp = await Bootcamp.findById(req.params.id);

  if (!bootcamp) {
    return next(
      new ErrorResponse(`Bootcamp with id ${req.params.id} not found`, 404)
    );
  }
  // Check if a file is uploaded
  if (!req.files) {
    return next(new ErrorResponse(`Please upload photo`, 400));
  }

  const file = req.files.file;
  console.log(file);

  // Check if the uploaded file is an image
  if (!file.mimetype.startsWith('image')) {
    return next(new ErrorResponse(`Please upload an image`, 400));
  }

  // Check file size
  if (file.size > process.env.MAX_FILE_UPLOAD) {
    return next(
      new ErrorResponse(
        `Please upload an image less than ${
          process.env.MAX_FILE_UPLOAD / 1000000
        } MB`,
        400
      )
    );
  }

  // Create custom name for the photo to avoid conflicting names
  file.name = `photo_${bootcamp._id}${path.parse(file.name).ext}`;

  file.mv(`${process.env.FILE_UPLOAD_PATH}/${file.name}`, async (err) => {
    if (err) {
      console.error(err);
      return next(new ErrorResponse('Problem with image upload', 500));
    }

    await Bootcamp.findByIdAndUpdate(req.params.id, { photo: file.name });

    res.json({
      success: true,
      data: file.name,
    });
  });
});

export {
  getBootcamps,
  getBootcamp,
  updateBootcamp,
  createBootcamp,
  deleteBootcamp,
  getBootcampsInRadius,
  bootcampPhotoUpload,
};
