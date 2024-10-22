import express from 'express';
import authMiddleware from '../middleware/authMiddleware.js';
import Listok from '../models/Listok.js';
import Recipe from '../models/Recipe.js';
import AdditionalItems from '../models/AdditionalItemList.js';

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

router.get('/fetchAdditionalItems', authMiddleware, async (req, res) => {
  console.log("FETCH ADDITIONAL ITEMS CALLED");

  const { userId } = req.user;
  console.log("User on fetch additional: ", userId);
  
  try {
    // Use findOne to get a single document by userId
    const additionalItems = await AdditionalItems.findOne({ userId: userId });
    console.log("Additional Items: ", additionalItems);

    // Check if additionalItems is null or undefined
    if (!additionalItems) {
      return res.status(204).send([]);  // 204 No Content, return an empty list
    }

    // If found, parse the items field
    const returnItemsList = JSON.parse(additionalItems.items);
    res.status(200).send(returnItemsList);
  } catch (error) {
    console.error("Error fetching additional items:", error);
    res.status(500).json({ message: "Error fetching additional items" });
  }
});

router.post('/updateAdditionalItems', authMiddleware, async (req, res) => {
  try {
    console.log('UPDATE ADDITIONAL ITEMS CALLED');
    
    // Extract userId from the auth middleware (assuming it sets req.user)
    const { userId } = req.user;
    console.log("User on update additional:", userId);

    // Extract items from the request body
    const items = req.body;  // Assume the body contains the items you want to update
    const jsonItems = JSON.stringify(items);  // Convert items to JSON string
    console.log("Additional Items!: ", jsonItems);

    // Use findOneAndUpdate with upsert option to update or insert if the document doesn't exist
    await AdditionalItems.findOneAndUpdate(
      { userId },  // Query to find by userId
      { items: jsonItems },  // Update the items field
      { new: true, upsert: true }  // Create a new document if it doesn't exist, and return the updated document
    );

    // Send a success response with the updated document
    res.status(200).json({ success: true });
  } catch (error) {
    console.error('Error updating additional items:', error);
    res.status(500).json({ success: false, message: 'Internal Server Error' });
  }
});



// try {
//   const newRecipe = new Recipe({
//     title: recipeData.title,
//     desc: recipeData.desc || null,
//     createdBy: recipeData.createdBy,
//     createdByName: recipeData.createdByName,
//     createdOn: Date.now(),
//     public: recipeData.public,
//     picture: recipeData.picture || null,
//     ingredients: JSON.stringify(recipeData.ingredients) || null,
//     method: JSON.stringify(recipeData.method) || null,
//   });
//   await newRecipe.save();
//   res.status(200).json({ message: ' Success: Recipe Saved ' });
//   return;
// } catch (error) {
//   console.log('Failed to add recipe: ', error);
//   res
//     .status(500)
//     .json({ message: ' Error: Internal Server Error, Please try again.' });
//   return;
// }

export default router;
