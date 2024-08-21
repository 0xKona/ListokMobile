import express from 'express';
import Recipe from '../models/Recipe.js';
import authMiddleware from '../middleware/authMiddleware.js';
import multer from 'multer';
import bucket from '../google-cloud-config.js';

const router = express.Router();

// Configure multer for handling form data
const storage = multer.memoryStorage();
const upload = multer({ storage });

// Function to handle image upload to Google Cloud Storage
const uploadImageToGCS = (file) => {
  return new Promise((resolve, reject) => {
    const blob = bucket.file(`images/${Date.now()}_${file.originalname}`);
    const blobStream = blob.createWriteStream({
      resumable: false,
      contentType: file.mimetype,
      public: true, // Make the file publicly accessible
    });

    blobStream.on('error', (err) => {
      console.error('Error uploading to GCS:', err);
      reject(new Error('Failed to upload image'));
    });

    blobStream.on('finish', () => {
      const imageUrl = `https://storage.googleapis.com/${bucket.name}/${blob.name}`; // The public URL of the image
      console.log("New image URL: ", imageUrl);
      resolve(imageUrl);
    });

    blobStream.end(file.buffer);
  });
};

// Function to delete an image from Google Cloud Storage
const deleteImageFromGCS = async (imageUrl) => {
  const oldImageName = imageUrl.split('/').pop(); // Extract the image name from the URL
  const oldImageBlob = bucket.file(`images/${oldImageName}`);
  await oldImageBlob.delete();
  console.log(`Deleted old image: ${oldImageName}`);
};

// Helper function to save or update the recipe in MongoDB
const saveRecipeToMongoDB = (recipeData, imageUrl, res, isUpdate = false) => {
  const recipeDetails = {
    title: recipeData.title,
    desc: recipeData.desc || null,
    createdBy: recipeData.createdBy,
    createdByName: recipeData.createdByName,
    createdOn: isUpdate ? recipeData.createdOn : Date.now(),
    public: recipeData.public === 'true',
    picture: imageUrl, // Save the Google Cloud Storage image URL
    ingredients: recipeData.ingredients || null,
    method: recipeData.method || null,
  };

  const dbOperation = isUpdate
    ? Recipe.updateOne({ _id: recipeData.id }, { $set: recipeDetails })
    : new Recipe(recipeDetails).save();

  dbOperation
    .then(() => res.status(200).json({ message: `Success: Recipe ${isUpdate ? 'updated' : 'saved'}` }))
    .catch((error) => {
      console.error(`Error ${isUpdate ? 'updating' : 'saving'} recipe in MongoDB:`, error);
      res.status(500).json({ message: 'Error: Internal Server Error, Please try again.' });
    });
};

router.post('/create_new', upload.single('picture'), async (req, res) => {
  const recipeData = req.body;
  console.log('[/create_new]: New Recipe: ', recipeData);

  if (!recipeData.title || !recipeData.createdBy) {
    console.log('missing params triggered');
    return res.status(400).json({ message: 'Error: Recipe not Saved, missing parameters' });
  }

  try {
    const imageUrl = req.file ? await uploadImageToGCS(req.file) : null;
    saveRecipeToMongoDB(recipeData, imageUrl, res);
  } catch (error) {
    console.error('Failed to add recipe:', error);
    res.status(500).json({ message: 'Error: Internal Server Error, Please try again.' });
  }
});

router.put('/edit_recipe/', authMiddleware, upload.single('picture'), async (req, res) => {
  const recipeData = req.body;
  console.log('received edit recipe request:', recipeData);

  if (!recipeData.id || !recipeData.title || !recipeData.createdBy) {
    console.log('missing params triggered');
    return res.status(400).json({ message: 'Error: Recipe not saved, missing parameters' });
  }

  try {
    // Fetch the existing recipe to get the current picture URL
    const existingRecipe = await Recipe.findById(recipeData.id);
    if (!existingRecipe) {
      return res.status(404).json({ message: 'Recipe not found' });
    }

    let imageUrl = existingRecipe.picture;

    // Check if the image should be removed
    if (recipeData.removePicture === 'true') {
      if (existingRecipe.picture) {
        await deleteImageFromGCS(existingRecipe.picture);
        imageUrl = ''; // Clear the image URL in the database
      }
    } else if (req.file) {
      // If a new image is uploaded, handle the replacement
      if (existingRecipe.picture) {
        await deleteImageFromGCS(existingRecipe.picture);
      }
      imageUrl = await uploadImageToGCS(req.file);
    }

    saveRecipeToMongoDB(recipeData, imageUrl, res, true);
  } catch (error) {
    console.log('Failed to update recipe:', error);
    res.status(500).json({ message: 'Error: Internal Server Error, please try again.' });
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
  console.log('[Server]: Delete recipe request received for recipeId: ', recipeId);

  try {
    await Recipe.deleteOne({ _id: recipeId });
    console.log('[Server]: Recipe ', recipeId, ' deleted successfully');
    res.status(200).json({ message: 'Recipe deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Internal Server Error, failed to delete recipe' });
  }
});

export default router;
