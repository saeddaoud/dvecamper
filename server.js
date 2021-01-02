import path from 'path';
import express from 'express';
import dotenv from 'dotenv';
import morgan from 'morgan';
import fileUpload from 'express-fileupload';
import cookieParser from 'cookie-parser';

import bootcampRoutes from './routes/bootcampRoutes.js';
import courseRoutes from './routes/courseRoutes.js';
import connectDB from './config/db.js';
import errorHandler from './middleware/errorMiddleware.js';
import authRoutes from './routes/authRoutes.js';
import userRoutes from './routes/userRoutes.js';
import reviewRoutes from './routes/reviewRoutes.js';

dotenv.config();

const app = express();

// Body parser
app.use(express.json());

// Cookie parser
app.use(cookieParser());

// connect to DB
connectDB();

// Static folder
app.use(express.static(path.join(path.resolve(), 'public')));

// Middlewares
if (process.env.NODE_ENV === 'development') app.use(morgan('dev'));

// Fileupload
app.use(fileUpload());

// Mount routes
app.use('/api/v1/bootcamps', bootcampRoutes);
app.use('/api/v1/courses', courseRoutes);
app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/users', userRoutes);
app.use('/api/v1/reviews', reviewRoutes);

// cutom error handler
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

const server = app.listen(PORT, () =>
  console.log(`Server is running on port ${PORT}`)
);

// Handle unhandled rejections
process.on('unhandledRejection', (error, promise) => {
  console.error(`Error: ${error.message}`);
  server.close(() => process.exit(1));
});
