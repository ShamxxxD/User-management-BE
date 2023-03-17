import express from 'express';
const authRoute = express.Router();
import authController from '../controllers/auth.controller.js';
import verifyToken from '../middlewares/verifyToken.js';

authRoute.post('/register', authController.registerUser);
authRoute.post('/login', authController.loginUser);
authRoute.post('/logout', verifyToken.isValidToken, authController.logoutUser);
authRoute.post('/refresh', authController.refreshToken);

export default authRoute;
