import { Storage } from "@google-cloud/storage"

const storage = new Storage({
  keyFilename: './config/listok-image-storage-config.json', // Path to your service account key file
  projectId: 'listok-414312', // Replace with your project ID
});

const bucketName = 'listok-images';
const bucket = storage.bucket(bucketName);

export default bucket
