import express from 'express';
const userRouter = express.Router();
import VerifyToken from '../middlewares/verifyToken.js';
import UserController from '../controllers/user.controller.js';

userRouter.delete('/:id', VerifyToken.isValidToken, VerifyToken.isAdmin, UserController.deleteUser);
userRouter.get('/pagination', VerifyToken.isValidToken, VerifyToken.isAdmin, UserController.getUsersPagination);
userRouter.get('/', UserController.getAllUsers);

export default userRouter;
