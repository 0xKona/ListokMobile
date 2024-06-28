import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import authRouter from './routes/auth.js';
import configRouter from './routes/config.js';

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

const mongoUri = process.env.MONGO_URI || 'mongodb://mongo:27017/yourdatabase';
mongoose
  .connect(mongoUri, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB connection error:', err));

app.use(express.json());

app.use('/api/auth', authRouter);
app.use('/api/config', configRouter);

app.get('/', (req, res) => {
  res.send('Hello, World!');
});

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});
