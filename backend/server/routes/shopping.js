import express from 'express';
import authMiddleware from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/getlist', authMiddleware, async (req, res) => {
  console.log('Request for Ingredients List triggered');
  const { listokId } = req.body;

  console.log('Request for ingredients for listokId: ', listokId);

  res.status(200).json();
});

export default router;
