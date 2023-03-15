import express from 'express';
const userRouter = express.Router();
import VerifyToken from '../middlewares/verifyToken.js';

import UserController from '../controllers/user.controller.js';

userRouter.post('/:id', VerifyToken.isValidToken, UserController.deleteUser);
userRouter.get('/', UserController.getAllUsers);

export default userRouter;
