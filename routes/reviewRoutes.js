import express from 'express';

import Review from '../models/reviewModel.js';
import advancedResults from '../middleware/advancedResults.js';
import { protect, authorize } from '../middleware/authMiddleware.js';
import { getReview, getReviews } from '../controllers/reviewControllers.js';

const router = express.Router({ mergeParams: true });

router
  .route('/')
  .get(
    advancedResults(Review, { path: 'bootcamp', select: 'name description' }),
    getReviews
  );

router.route('/:id').get(getReview);

export default router;
