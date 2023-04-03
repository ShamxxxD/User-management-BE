import express from 'express';
const userRouter = express.Router();
import verifyToken from '../middlewares/verifyToken.js';
import UserController from '../controllers/user.controller.js';

userRouter.delete('/:id', verifyToken.isAdmin, UserController.deleteUser);
userRouter.patch('/change-password/:id', verifyToken.isValidToken, verifyToken.isAdmin, UserController.changePassword);
userRouter.patch('/:id', verifyToken.isValidToken, verifyToken.isAdmin, UserController.editUser);
userRouter.post('/register', UserController.registerUser);
userRouter.get('/pagination', UserController.getUsersPagination);
userRouter.get('/search', UserController.searchUsers);
userRouter.get('/:userId', UserController.getUserDetail);
userRouter.get('/', UserController.getAllUsers);

export default userRouter;
