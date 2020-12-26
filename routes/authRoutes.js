import express from 'express';
import {
  register,
  login,
  getLoggedInUser,
  forgotPassword,
} from '../controllers/authControllers.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.route('/register').post(register);
router.route('/login').post(login);
router.route('/me').get(protect, getLoggedInUser);
router.route('/forgotpassword').post(forgotPassword);

export default router;
