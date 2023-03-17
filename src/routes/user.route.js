import express from 'express';
const userRouter = express.Router();
import verifyToken from '../middlewares/verifyToken.js';
import UserController from '../controllers/user.controller.js';

userRouter.delete('/:id', verifyToken.isAdmin, UserController.deleteUser);
userRouter.patch('/:id', UserController.editUser);
userRouter.get('/pagination', verifyToken.isValidToken, UserController.getUsersPagination);
userRouter.get('/', UserController.getAllUsers);

export default userRouter;
