import express from 'express';
import {
  getCourseById,
  getCourses,
  addCourse,
  updateCourse,
  deleteCourse,
} from '../controllers/courseControllers.js';

const router = express.Router({ mergeParams: true });

router.route('/').get(getCourses).post(addCourse);
router.route('/:id').get(getCourseById).put(updateCourse).delete(deleteCourse);

export default router;
