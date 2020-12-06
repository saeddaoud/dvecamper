import express from 'express';
import courseRoutes from './courseRoutes.js';
import {
  createBootcamp,
  deleteBootcamp,
  getBootcamp,
  getBootcamps,
  getBootcampsInRadius,
  updateBootcamp,
} from '../controllers/bootcampControllers.js';

const router = express.Router();
// Re-route this link to courseRouter
router.use('/:bootcampId/courses', courseRoutes);

router.route('/').get(getBootcamps).post(createBootcamp);
router
  .route('/:id')
  .get(getBootcamp)
  .put(updateBootcamp)
  .delete(deleteBootcamp);
router.route('/radius/:zipcode/:distance').get(getBootcampsInRadius);

export default router;
