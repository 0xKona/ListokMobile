import express from 'express';
import Recipe from '../models/Recipe.js';
import authMiddleware from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/create_new', authMiddleware, async (req, res) => {
  const recipeData = req.body;
  console.log('recieved new recipe requst:', recipeData);
  if (!recipeData.title || !recipeData.createdBy) {
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
      createdByName: recipeData.createdByName,
      createdOn: Date.now(),
      public: recipeData.public,
      picture: recipeData.picture || null,
      ingredients: JSON.stringify(recipeData.ingredients) || null,
      method: JSON.stringify(recipeData.method) || null,
    });
    await newRecipe.save();
    res.status(200).json({ message: ' Success: Recipe Saved ' });
    return;
  } catch (error) {
    console.log('Failed to add recipe: ', error);
    res
      .status(500)
      .json({ message: ' Error: Internal Server Error, Please try again.' });
    return;
  }
});

router.get('/recipes_by_user/:userId', authMiddleware, async (req, res) => {
  const { userId } = req.params;
  console.log('Fetching recipes for user:', userId);

  try {
    const recipes = await Recipe.find({ createdBy: userId });
    if (recipes.length === 0) {
      res.status(204).json([]);
      return;
    }
    res.status(200).json(recipes);
  } catch (error) {
    console.log('Failed to fetch recipes:', error);
    res
      .status(500)
      .json({ message: 'Error: Internal Server Error, Please try again.' });
  }
});

router.delete('/delete_recipe/:recipeId', authMiddleware, async (req, res) => {
  const { recipeId } = req.params;
  console.log(
    '[Server]: Delete recipe request recieved for recipeId: ',
    recipeId,
  );

  try {
    await Recipe.deleteOne({ _id: recipeId });
    console.log('[Server]: Recipe ', recipeId, ' deleted successfully');
  } catch (error) {
    res
      .status(500)
      .json({ message: 'Internal Server Error, failed to delete recipe' });
  }
});

router.put('/edit_recipe/', authMiddleware, async (req, res) => {
  const recipeData = req.body;
  console.log('received edit recipe request:', recipeData);

  if (!recipeData.id || !recipeData.title || !recipeData.createdBy) {
    console.log('missing params triggered');
    res
      .status(400)
      .json({ message: 'Error: Recipe not saved, missing parameters' });
    return;
  }

  try {
    const updateData = {
      title: recipeData.title,
      desc: recipeData.desc || null,
      createdBy: recipeData.createdBy,
      createdByName: recipeData.createdByName,
      createdOn: recipeData.createdOn || Date.now(),
      public: recipeData.public,
      picture: recipeData.picture || null,
      ingredients: JSON.stringify(recipeData.ingredients) || null,
      method: JSON.stringify(recipeData.method) || null,
    };

    await Recipe.updateOne({ _id: recipeData.id }, { $set: updateData });
    res.status(200).json({ message: 'Success: Recipe updated' });
  } catch (error) {
    console.log('Failed to update recipe: ', error);
    res
      .status(500)
      .json({ message: 'Error: Internal Server Error, please try again.' });
  }
});

export default router;
