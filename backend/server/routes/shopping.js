import express from 'express';
import authMiddleware from '../middleware/authMiddleware.js';
import Listok from '../models/Listok.js';
import Recipe from '../models/Recipe.js';

const router = express.Router();

router.post('/getlist', authMiddleware, async (req, res) => {
  console.log('Request for Ingredients List triggered');

  const { listokId } = req.body;
  const userId = req.user.userId; // Extracted from the JWT in authMiddleware

  console.log('Request for ingredients for listokId:', listokId);
  console.log('UserId: ', userId);

  try {
    // Fetch the Listok document
    const listok = await Listok.findById(listokId);

    if (!listok) {
      return res.status(404).json({ message: 'Error: Listok not found' });
    }

    // Verify user permission (creator or public)
    if (listok.createdBy !== userId /* && !listok.public */) {
      return res
        .status(403)
        .json({ message: 'Error: Unauthorized access to Listok' });
    }

    const ingredientsArray = [];

    // Iterate over each day in the Listok
    const parsedDays = JSON.parse(listok.days);
    for (const day in parsedDays) {
      console.log('looping over days: ', parsedDays[day]);

      for (const recipeId of parsedDays[day]) {
        try {
          const recipe = await Recipe.findById(recipeId);
          console.log('Recipe: ', recipe);

          const recipeIngredients = JSON.parse(recipe.ingredients);
          console.log('ingredients in recipe: ', recipeIngredients);
          recipeIngredients.forEach(e => ingredientsArray.push(e));
        } catch (error) {
          console.log('Failed to get recipe: ', recipeId);
        }
      }
    }

    console.log('Final Ingredients Array to return: ', ingredientsArray);

    res.status(200).json({
      message: 'Success: Ingredients fetched',
      ingredients: ingredientsArray,
    });
  } catch (error) {
    console.error('Error fetching ingredients:', error);
    res
      .status(500)
      .json({ message: 'Error: Internal Server Error, Please try again.' });
  }
});

export default router;
