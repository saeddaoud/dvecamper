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
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router({ mergeParams: true });

router
  .route('/')
  .get(
    advancedResults(Course, { path: 'bootcamp', select: 'name description' }),
    getCourses
  )
  .post(protect, addCourse);
router
  .route('/:id')
  .get(getCourseById)
  .put(protect, updateCourse)
  .delete(protect, deleteCourse);

export default router;
