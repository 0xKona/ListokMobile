import express from 'express';
import multer from 'multer';
import bucket from '../google-cloud-config.js';
import authMiddleware from '../middleware/authMiddleware.js';

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

// Route to upload a new image
router.post('/upload', authMiddleware, upload.single('picture'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: 'No image file provided' });
    }

    const imageUrl = await uploadImageToGCS(req.file);
    console.log('[Upload Image]: New Image URL: ', imageUrl)
    return res.status(200).json(imageUrl); // Return the URL of the uploaded image
  } catch (error) {
    console.error('Failed to upload image:', error);
    return res.status(500).json({ message: 'Failed to upload image' });
  }
});

// Route to delete an image
router.delete('/delete', authMiddleware, async (req, res) => {
  const { imageUrl } = req.body;

  if (!imageUrl) {
    return res.status(400).json({ message: 'No image URL provided' });
  }

  try {
    await deleteImageFromGCS(imageUrl);
    return res.status(200).json({ message: 'Image deleted successfully' });
  } catch (error) {
    console.error('Failed to delete image:', error);
    return res.status(500).json({ message: 'Failed to delete image' });
  }
});

export default router;
