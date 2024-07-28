import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import authRouter from './routes/auth.js';
import configRouter from './routes/config.js';
import recipeRouter from './routes/recipes.js';
import listokRouter from './routes/listoks.js';
import shoppingRouter from './routes/shopping.js';

dotenv.config({ path: './backend/.env' });

const app = express();
const port = process.env.PORT || 3000;

const devMode = process.env.NODE_ENV === 'dev';
console.log('Dev Mode', devMode);
const mongoUri = devMode
  ? process.env.MONGO_URI_DEV
  : process.env.MONGO_URI_PROD;

console.log('Dev Uri: ', process.env.MONGO_URI_DEV);
console.log('Mongo Uri: ', mongoUri);
mongoose
  .connect(mongoUri, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected successfully'))
  .catch(err => console.error('MongoDB connection error:', err));

app.use(express.json());

// Routers
app.use('/api/auth', authRouter);
app.use('/api/config', configRouter);
app.use('/api/recipes', recipeRouter);
app.use('/api/listoks', listokRouter);
app.use('/api/shopping', shoppingRouter);

app.get('/', (req, res) => {
  res.send('Hello, World!');
});

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});
