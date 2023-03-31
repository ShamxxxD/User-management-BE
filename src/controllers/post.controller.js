import Post from '../models/post.model.js';
import jwt from 'jsonwebtoken';

class PostController {
    async getAllPosts(req, res, next) {
        try {
            const posts = await Post.find().populate('author');

            return res.status(200).json({ posts });
        } catch (error) {
            console.log('----error---', error);
            return res.status(200).json(error);
        }
    }

    async getTwentyPosts(req, res, next) {
        //...
    }

    async getMyPosts(req, res, next) {
        try {
            const accessToken = req.headers.token;
            const limit = parseInt(req.query.limit) || 4;
            const jwtDecoded = jwt.verify(accessToken, process.env.JWT_ACCESS_KEY);
            const userId = jwtDecoded.user._id;

            // const offset = (page - 1) * limit;

            const posts = await Post.find({ author: userId }).limit(limit).lean();
            res.status(200).json({ posts });
        } catch (error) {
            console.error(error);
            res.status(404).json(error);
        }
    }

    async createPost(req, res, next) {
        try {
            const data = req.body;
            const post = await Post.create(data);
            res.status(200).json({ post });
        } catch (error) {
            return res.status(200).json('Lỗi');
        }
    }

    async editPost(req, res, next) {
        //...
    }

    async deletePost(req, res, next) {
        try {
            const postId = req.params.id;
            const result = await Post.findByIdAndDelete({ _id: postId });
            res.status(200).json({ result });
        } catch (error) {
            console.log(error);
        }
    }
}

export default new PostController();
