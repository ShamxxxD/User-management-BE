import express from 'express';
const userRouter = express.Router();
import verifyToken from '../middlewares/verifyToken.js';
import UserController from '../controllers/user.controller.js';

userRouter.delete('/:id', verifyToken.isAdmin, UserController.deleteUser);
userRouter.patch('/change-password/:id', verifyToken.isValidToken, UserController.changePassword);
userRouter.patch('/:id', verifyToken.isValidToken, UserController.editUser);
userRouter.post('/register', UserController.registerUser);
userRouter.get('/pagination', UserController.getUsersPagination);
userRouter.get('/:userId', UserController.getUserDetail);
userRouter.get('/', UserController.getAllUsers);

export default userRouter;
