import express from 'express';
import {
  register,
  login,
  getLoggedInUser,
  forgotPassword,
  resetPassword,
} from '../controllers/authControllers.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.route('/register').post(register);
router.route('/login').post(login);
router.route('/me').get(protect, getLoggedInUser);
router.route('/forgotpassword').post(forgotPassword);
router.route('/resetpassword/:resettoken').put(resetPassword);

export default router;
