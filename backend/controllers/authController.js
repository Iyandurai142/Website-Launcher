import User from '../models/User.js';
import jwt from 'jsonwebtoken';
import logger from '../utils/logger.js';

const generateToken = (user) => {
  return jwt.sign(
    { id: user._id, email: user.email, role: user.role },
    process.env.JWT_SECRET || 'your-secret-key',
    { expiresIn: '24h' }
  );
};

const generateRefreshToken = (user) => {
  return jwt.sign(
    { id: user._id },
    process.env.REFRESH_TOKEN_SECRET || 'refresh-secret-key',
    { expiresIn: '7d' }
  );
};

export const register = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Check if user exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      logger.warn(`User already exists: ${email}`);
      return res.status(400).json({ success: false, message: 'User already exists' });
    }

    // Create new user
    const user = new User({ name, email, password });
    await user.save();

    logger.info(`User registered: ${email}`);
    res.status(201).json({
      success: true,
      message: 'User registered successfully',
      user: user.toJSON()
    });
  } catch (error) {
    logger.error(`Registration error: ${error.message}`);
    res.status(500).json({ success: false, message: error.message });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find user
    const user = await User.findOne({ email });
    if (!user) {
      logger.warn(`Login attempt with non-existent email: ${email}`);
      return res.status(401).json({ success: false, message: 'Invalid credentials' });
    }

    // Verify password
    const isPasswordValid = await user.comparePassword(password);
    if (!isPasswordValid) {
      logger.warn(`Failed login attempt for: ${email}`);
      return res.status(401).json({ success: false, message: 'Invalid credentials' });
    }

    // Generate tokens
    const token = generateToken(user);
    const refreshToken = generateRefreshToken(user);

    logger.info(`User logged in: ${email}`);
    res.status(200).json({
      success: true,
      message: 'Login successful',
      token,
      refreshToken,
      user: user.toJSON()
    });
  } catch (error) {
    logger.error(`Login error: ${error.message}`);
    res.status(500).json({ success: false, message: error.message });
  }
};

export const refreshToken = (req, res) => {
  try {
    const { refreshToken } = req.body;

    jwt.verify(
      refreshToken,
      process.env.REFRESH_TOKEN_SECRET || 'refresh-secret-key',
      (err, user) => {
        if (err) {
          logger.warn('Invalid refresh token');
          return res.status(403).json({ success: false, message: 'Invalid refresh token' });
        }

        const newToken = jwt.sign(
          { id: user.id },
          process.env.JWT_SECRET || 'your-secret-key',
          { expiresIn: '24h' }
        );

        res.status(200).json({ success: true, token: newToken });
      }
    );
  } catch (error) {
    logger.error(`Token refresh error: ${error.message}`);
    res.status(500).json({ success: false, message: error.message });
  }
};