import express from 'express';
import courseRoutes from './courseRoutes.js';
import reviewRoutes from './reviewRoutes.js';
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
import { protect, authorize } from '../middleware/authMiddleware.js';

const router = express.Router();
// Re-route this link to courseRouter
router.use('/:bootcampId/courses', courseRoutes);
router.use('/:bootcampId/reviews', reviewRoutes);

router
  .route('/')
  .get(advancedResults(Bootcamp, 'courses'), getBootcamps)
  .post(protect, authorize('publisher', 'admin'), createBootcamp);
router
  .route('/:id')
  .get(getBootcamp)
  .put(protect, authorize('publisher', 'admin'), updateBootcamp)
  .delete(protect, authorize('publisher', 'admin'), deleteBootcamp);
router.route('/radius/:zipcode/:distance').get(getBootcampsInRadius);
router
  .route('/:id/photo')
  .put(protect, authorize('publisher', 'admin'), bootcampPhotoUpload);

export default router;
