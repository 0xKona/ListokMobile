import express from 'express';
import Recipe from '../models/Recipe.js';
import authMiddleware from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/create_new', authMiddleware, async (req, res) => {
  const recipeData = req.body;
  console.log('recieved new recipe requst:', recipeData);
  if (!recipeData.title || !recipeData.createdBy.userId) {
    console.log('missing params triggered');
    res
      .status(400)
      .json({ message: 'Error: Recipe not Saved, missing parameters' });
    return;
  }

  try {
    const newRecipe = new Recipe({
      title: recipeData.title,
      desc: recipeData.desc || null,
      createdBy: recipeData.createdBy,
      createdOn: Date.now(),
      public: recipeData.public,
      picture: recipeData.picture || null,
      ingredients: recipeData.ingredients || null,
      method: recipeData.method || null,
    });
    await newRecipe.save();
    res.status(200).json({ message: ' Success: Recipe Saved ' });
    return;
  } catch (error) {
    res
      .status(500)
      .json({ message: ' Error: Internal Server Error, Please try again.' });
    return;
  }
});

export default router;
