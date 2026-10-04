import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import { connectToMongoDB } from './config/db.js';
import productRoutes from './routes/productRoutes.js';

dotenv.config();

const app = express();

app.use(cors({
  origin: '*', 
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use(express.json());

connectToMongoDB().then(() => {
  app.use('/api/products', productRoutes);

  const PORT = process.env.PORT || 5000;
  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server running on port ${PORT}`);
  });
});