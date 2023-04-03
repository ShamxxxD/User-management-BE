import express from 'express';
import CommentController from '../controllers/comment.controller.js';
import verifyToken from '../middlewares/verifyToken.js';

const commentRoute = express.Router();

commentRoute.delete('/:id', CommentController.deleteComment);
commentRoute.patch('/:id', CommentController.editComment);
commentRoute.post('/', CommentController.createComment);
commentRoute.get('/', CommentController.getComments);

export default commentRoute;
