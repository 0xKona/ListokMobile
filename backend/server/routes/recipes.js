import express from 'express';
import Recipe from '../models/Recipe';
import authMiddleware from '../middleware/authMiddleware';

const router = express.router();

router.post('/create_new', authMiddleware, async (res, req) => {
  const { recipeData } = req.body;

  if (!recipeData.title || !recipeData.createdBy || !recipeData.public) {
    res
      .status(400)
      .json({ message: 'Error: Recipe not Saved, missing parameters' });
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
  } catch (error) {
    res
      .status(500)
      .json({ message: ' Error: Internal Server Error, Please try again.' });
  }
});

export default router;
