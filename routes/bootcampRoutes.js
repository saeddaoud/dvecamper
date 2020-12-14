import express from 'express';
import courseRoutes from './courseRoutes.js';
import {
  bootcampPhotoUpload,
  createBootcamp,
  deleteBootcamp,
  getBootcamp,
  getBootcamps,
  getBootcampsInRadius,
  updateBootcamp,
} from '../controllers/bootcampControllers.js';

import advancedResults from '../middleware/advancedResults.js';
import Bootcamp from '../models/bootcampModel.js';

const router = express.Router();
// Re-route this link to courseRouter
router.use('/:bootcampId/courses', courseRoutes);

router
  .route('/')
  .get(advancedResults(Bootcamp, 'courses'), getBootcamps)
  .post(createBootcamp);
router
  .route('/:id')
  .get(getBootcamp)
  .put(updateBootcamp)
  .delete(deleteBootcamp);
router.route('/radius/:zipcode/:distance').get(getBootcampsInRadius);
router.route('/:id/photo').put(bootcampPhotoUpload);

export default router;
