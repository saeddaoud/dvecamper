// @desc        Get all bootcamps
// @route       GET /api/v1/bootcamps
// @access      Public
const getBootcamps = (req, res, next) => {
  res.status(200).json({
    success: true,
    meg: 'Show all bootcamps',
  });
};

// @desc        Get bootcamp by id
// @route       GET /api/v1/bootcamps/:id
// @access      Public
const getBootcamp = (req, res, next) => {
  res.status(200).json({
    success: true,
    meg: `Show  bootcamp ${req.params.id}`,
  });
};

// @desc        Create a new bootcamp
// @route       POST /api/v1/bootcamps
// @access      Private
const createBootcamp = (req, res, next) => {
  res.status(200).json({
    success: true,
    meg: 'Create a bootcamp',
  });
};

// @desc        Update bootcamp
// @route       PUT /api/v1/bootcamps/:id
// @access      Private
const updateBootcamp = (req, res, next) => {
  res.status(200).json({
    success: true,
    meg: `Update  bootcamp ${req.params.id}`,
  });
};

// @desc        Delete bootcamp
// @route       DELETE /api/v1/bootcamps/:id
// @access      Private
const deleteBootcamp = (req, res, next) => {
  res.status(200).json({
    success: true,
    meg: `Delete  bootcamp ${req.params.id}`,
  });
};

export {
  getBootcamps,
  getBootcamp,
  updateBootcamp,
  createBootcamp,
  deleteBootcamp,
};
