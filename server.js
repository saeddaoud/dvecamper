import express from 'express';
import dotenv from 'dotenv';
import bootcampsRoutes from './routes/bootcampsRoutes.js';
// import { logger } from './middleware/logger.js';
import morgan from 'morgan';
import connectDB from './config/db.js';

dotenv.config();

const app = express();

// connect to DB
connectDB();

// Middlewares
if (process.env.NODE_ENV === 'development') app.use(morgan('dev'));

// Mount routes
app.use('/api/v1/bootcamps', bootcampsRoutes);

const PORT = process.env.PORT || 5000;

const server = app.listen(PORT, () =>
  console.log(`Server is running on port ${PORT}`)
);

// Handle unhandled rejections
process.on('unhandledRejection', (error, promise) => {
  console.error(`Error: ${error.message}`);
  server.close(() => process.exit(1));
});
