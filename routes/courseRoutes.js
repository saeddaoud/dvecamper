import express from 'express';
import {
  getCourseById,
  getCourses,
  addCourse,
  updateCourse,
  deleteCourse,
} from '../controllers/courseControllers.js';

import Course from '../models/courseModel.js';
import advancedResults from '../middleware/advancedResults.js';

const router = express.Router({ mergeParams: true });

router
  .route('/')
  .get(
    advancedResults(Course, { path: 'bootcamp', select: 'name description' }),
    getCourses
  )
  .post(addCourse);
router.route('/:id').get(getCourseById).put(updateCourse).delete(deleteCourse);

export default router;
