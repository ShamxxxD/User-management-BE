import express from 'express';
const authRoute = express.Router();

import authController from '../controllers/auth.controller.js';

authRoute.post('/register', authController.registerUser);
authRoute.post('/login', authController.loginUser);

export default authRoute;
