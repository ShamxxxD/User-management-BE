import express from 'express';
import postController from '../controllers/post.controller.js';
const postRoute = express.Router();

postRoute.delete('/:id', postController.deletePost);
postRoute.patch('/:id', postController.editPost);
postRoute.post('/', postController.createPost);
postRoute.get('/params', postController.getTwentyPosts);
postRoute.get('/my-posts', postController.getMyPosts);
postRoute.get('/', postController.getAllPosts);

export default postRoute;
