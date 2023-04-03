import express from 'express';
import postController from '../controllers/post.controller.js';
import verifyToken from '../middlewares/verifyToken.js';
const postRoute = express.Router();

postRoute.delete('/:id', postController.deletePost);
postRoute.patch('/:id', postController.editPost);
postRoute.post('/:id/like', verifyToken.isValidToken, postController.likePost);
postRoute.post('/', postController.createPost);
postRoute.get('/my-posts', postController.getUserPosts);
postRoute.get('/:id', postController.getPostDetail);
postRoute.get('/', postController.getPosts);

export default postRoute;
