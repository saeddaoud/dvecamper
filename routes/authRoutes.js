import express from 'express';
import { resgister } from '../controllers/authControllers.js';

const router = express.Router();

router.route('/register').post(resgister);

export default router;
