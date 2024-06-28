import express from 'express';
import { OAuth2Client } from 'google-auth-library';
import jwt from 'jsonwebtoken';
import User from '../models/User.js';

const router = express.Router();
const client = new OAuth2Client(process.env.GOOGLE_OAUTH_CLIENT_ID);

// Login route
router.post('/login', async (req, res) => {
  const { token } = req.body;
  console.log('Login Requested with token:', token);
  try {
    // Verify the token
    const ticket = await client.verifyIdToken({
      idToken: token,
      audience: process.env.GOOGLE_OAUTH_CLIENT_ID,
    });

    const payload = ticket.getPayload();
    console.log('Google Response: ', payload);

    const googleId = payload.sub;

    // Check if user exists in db
    let user = await User.findOne({ googleId });
    console.log('User Details:', user);
    if (!user) {
      // Create a new user if not exists
      user = new User({
        googleId,
        email: payload.email,
        name: payload.name,
        picture: payload.picture,
      });
      await user.save();
    }

    // Generate a JWT token
    const sessionToken = jwt.sign(
      { userId: user._id },
      process.env.JWT_SECRET || 'your_jwt_secret',
      { expiresIn: '24h' },
    );

    res.status(200).json({
      userId: user._id,
      email: user.email,
      name: user.name,
      picture: user.picture,
      token: sessionToken,
    });
  } catch (error) {
    console.error('Error during Google login:', error);
    res.status(401).json({ message: 'Unauthorized' });
  }
});

export default router;
