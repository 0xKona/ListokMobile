import express from 'express';

const router = express.Router();

router.get('/', (req, res) => {
  console.log('Config Requested:', process.env.IOS_CLIENT_ID);

  // Simulate a delay with setTimeout
  setTimeout(() => {
    res.status(200).send(
      JSON.stringify({
        googleClientId: process.env.GOOGLE_CLIENT_ID,
        iosClientId: process.env.IOS_CLIENT_ID,
        androidClientId: process.env.ANDROID_CLIENT_ID,
        webClientId: process.env.WEB_CLIENT_ID,
      }),
    );
  }, 0);
});

export default router;
