import express from 'express';
import * as authController from '../controllers/authController.js';
import { validateRegister, validateLogin } from '../middleware/validationMiddleware.js';

const router = express.Router();

router.post('/register', validateRegister, authController.register);
router.post('/login', validateLogin, authController.login);
router.post('/refresh-token', authController.refreshToken);

export default router;