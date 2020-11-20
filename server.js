import express from 'express';
import dotenv from 'dotenv';
import bootcampsRoutes from './routes/bootcampsRoutes.js';
// import { logger } from './middleware/logger.js';
import morgan from 'morgan';

dotenv.config();

const app = express();

// Middlewares
if (process.env.NODE_ENV === 'development') app.use(morgan('dev'));

// Mount routes
app.use('/api/v1/bootcamps', bootcampsRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
