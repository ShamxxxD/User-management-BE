import express from 'express';
import CommentController from '../controllers/comment.controller.js';
const commentRoute = express.Router();

commentRoute.get('/', CommentController.getAllPosts);

export default commentRoute;
