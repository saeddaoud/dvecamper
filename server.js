import express from 'express';
import dotenv from 'dotenv';
import bootcampRoutes from './routes/bootcampRoutes.js';
// import { logger } from './middleware/logger.js';
import morgan from 'morgan';
import connectDB from './config/db.js';
import errorHandler from './middleware/errorMiddleware.js';

dotenv.config();

const app = express();

// Body parser
app.use(express.json());

// connect to DB
connectDB();

// Middlewares
if (process.env.NODE_ENV === 'development') app.use(morgan('dev'));

// Mount routes
app.use('/api/v1/bootcamps', bootcampRoutes);

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
