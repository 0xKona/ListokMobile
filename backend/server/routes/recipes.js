import express from 'express';
import Recipe from '../models/Recipe.js';
import authMiddleware from '../middleware/authMiddleware.js';
import multer from 'multer';
import bucket from '../google-cloud-config.js';

const router = express.Router();

// Configure multer for handling form data
const storage = multer.memoryStorage();
const upload = multer({ storage });

const saveRecipeToMongoDB = (recipeData, imageUrl, res) => {
  console.log('Save New Recipe Image Url: ', imageUrl)
  const newRecipe = new Recipe({
    title: recipeData.title,
    desc: recipeData.desc || null,
    createdBy: recipeData.createdBy,
    createdByName: recipeData.createdByName,
    createdOn: Date.now(),
    public: recipeData.public === 'true',
    picture: imageUrl, // Save the Google Cloud Storage image URL
    ingredients: JSON.stringify(recipeData.ingredients) || null,
    method: JSON.stringify(recipeData.method) || null,
  });

  newRecipe.save()
    .then(() => res.status(200).json({ message: 'Success: Recipe Saved' }))
    .catch((error) => {
      console.error('Error saving recipe to MongoDB:', error);
      res.status(500).json({ message: 'Error: Internal Server Error, Please try again.' });
    });
}

router.post('/create_new', upload.single('picture'), async (req, res) => {
  const recipeData = req.body;

  if (!recipeData.title || !recipeData.createdBy) {
    console.log('missing params triggered');
    return res.status(400).json({ message: 'Error: Recipe not Saved, missing parameters' });
  }

  try {
    let imageUrl = null;

    // If an image is uploaded, store it in Google Cloud Storage
    if (req.file) {
      const blob = bucket.file(`images/${Date.now()}_${req.file.originalname}`);
      const blobStream = blob.createWriteStream({
        resumable: false,
        contentType: req.file.mimetype,
        public: true, // Make the file publicly accessible
      });

      blobStream.on('error', (err) => {
        console.error('Error uploading to GCS:', err);
        res.status(500).json({ message: 'Failed to upload image' });
      });

      blobStream.on('finish', () => {
        imageUrl = `https://storage.googleapis.com/${bucket.name}/${blob.name}`; // The public URL of the image
        console.log("New Recipe Image Url: ", imageUrl)
        // Now save the recipe data including the image URL to MongoDB
        saveRecipeToMongoDB(recipeData, imageUrl, res);
      });

      blobStream.end(req.file.buffer);
    } else {
      // If no image is uploaded, save the recipe data without an image
      saveRecipeToMongoDB(recipeData, imageUrl, res);
    }
  } catch (error) {
    console.error('Failed to add recipe:', error);
    res.status(500).json({ message: 'Error: Internal Server Error, Please try again.' });
  }
});


router.get('/recipes_by_user/:userId', authMiddleware, async (req, res) => {
  const { userId } = req.params;
  console.log('Fetching recipes for user:', userId);

  try {
    const recipes = await Recipe.find({ createdBy: userId }, '-picture.data'); // Exclude the image data
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

router.get('/recipe_image/:recipeId', authMiddleware, async (req, res) => {
  const { recipeId } = req.params;

  try {
    const recipe = await Recipe.findById(recipeId, 'picture'); // Only fetch the picture field
    if (!recipe || !recipe.picture) {
      res.status(404).json({ message: 'Image not found' });
      return;
    }
    res.set('Content-Type', recipe.picture.contentType);
    res.send(recipe.picture.data);
  } catch (error) {
    console.log('Failed to fetch image:', error);
    res.status(500).json({ message: 'Error: Internal Server Error, Please try again.' });
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
