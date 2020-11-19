import express from 'express';
import dotenv from 'dotenv';
import bootcampsRoutes from './routes/bootcampsRoutes.js';

dotenv.config();

const app = express();

// Mount routes
app.use('/api/v1/bootcamps', bootcampsRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
