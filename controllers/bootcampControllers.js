import Bootcamp from '../models/bootcampModel.js';
// @desc        Get all bootcamps
// @route       GET /api/v1/bootcamps
// @access      Public
const getBootcamps = async (req, res, next) => {
  try {
    const bootcamps = await Bootcamp.find();
    res.status(200).json({
      success: true,
      count: bootcamps.length,
      data: bootcamps,
    });
  } catch (error) {
    console.error(error.message);
    res.status(400).json({
      success: false,
    });
  }
};

// @desc        Get bootcamp by id
// @route       GET /api/v1/bootcamps/:id
// @access      Public
const getBootcamp = async (req, res, next) => {
  try {
    const bootcamp = await Bootcamp.findById(req.params.id);
    // This if statement handles the caes when the id is a valid ObjectId by there is no bootcamp with that id. The catch block deals with the case where the id is not a valid ObjectId
    if (!bootcamp) {
      return res.status(400).json({ success: false });
    }
    res.status(200).json({
      success: true,
      data: bootcamp,
    });
  } catch (error) {
    console.error(error.message);
    res.status(400).json({
      success: false,
    });
  }
};

// @desc        Create a new bootcamp
// @route       POST /api/v1/bootcamps
// @access      Private
const createBootcamp = async (req, res, next) => {
  try {
    const bootcamp = await Bootcamp.create(req.body);
    res.status(201).json({
      success: true,
      data: bootcamp,
    });
  } catch (error) {
    console.error(error.message);
    res.status(400).json({
      success: false,
    });
  }
};

// @desc        Update bootcamp
// @route       PUT /api/v1/bootcamps/:id
// @access      Private
const updateBootcamp = async (req, res, next) => {
  try {
    const updatedBootcamp = await Bootcamp.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );

    if (!updateBootcamp) {
      return res.status(400).json({ success: false });
    }

    res.status(200).json({ success: true, data: updatedBootcamp });
  } catch (error) {
    console.error(error.message);
    res.status(400).json({ success: false });
  }
};

// @desc        Delete bootcamp
// @route       DELETE /api/v1/bootcamps/:id
// @access      Private
const deleteBootcamp = async (req, res, next) => {
  try {
    const deletedBootcamp = await Bootcamp.findByIdAndDelete(req.params.id);

    if (!deletedBootcamp) {
      return res.status(400).json({ success: false });
    }

    res.status(200).json({ success: true, data: {} });
  } catch (error) {
    console.error(error.message);
    res.status(400).json({ success: false });
  }
};

export {
  getBootcamps,
  getBootcamp,
  updateBootcamp,
  createBootcamp,
  deleteBootcamp,
};
