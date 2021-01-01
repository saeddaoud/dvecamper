import express from 'express';

import {
  createUser,
  deleteUser,
  getUser,
  getUsers,
  updateUser,
} from '../controllers/userControllers.js';
import { authorize, protect } from '../middleware/authMiddleware.js';
import advancedResults from '../middleware/advancedResults.js';

import User from '../models/userModel.js';
const router = express.Router();

// These middlewares are applied to all the routes below them
router.use(protect);
router.use(authorize('admin'));

router.route('/').get(advancedResults(User), getUsers).post(createUser);

router.route('/:id').put(updateUser).get(getUser).delete(deleteUser);

export default router;
