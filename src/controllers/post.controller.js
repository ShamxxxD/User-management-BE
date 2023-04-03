import Post from '../models/post.model.js';
import { ObjectId } from 'mongodb';

class PostController {
    async getPosts(req, res, next) {
        const limit = req.query._limit;
        const skip = req.query._skip;

        try {
            const posts = await Post.aggregate([
                {
                    // merge Post with Comments
                    $lookup: {
                        from: 'Comments',
                        localField: '_id',
                        foreignField: 'postId',
                        as: 'comments',
                    },
                },
                {
                    // merge Post with Users
                    $lookup: {
                        from: 'Users',
                        localField: 'author',
                        foreignField: '_id',
                        as: 'author',
                    },
                },
                {
                    // merge Comments with Users
                    $lookup: {
                        from: 'Users',
                        localField: 'comments.author',
                        foreignField: '_id',
                        as: 'authorComment',
                    },
                },
                {
                    $project: {
                        _id: 1,
                        content: 1,
                        video: 1,
                        image: 1,
                        likes: 1,
                        author: { $arrayElemAt: ['$author', 0] },
                        comments: {
                            $map: {
                                input: { $slice: ['$comments', 3] },
                                as: 'comment',
                                in: {
                                    _id: '$$comment._id',
                                    comment: '$$comment.comment',
                                    author: { $arrayElemAt: ['$authorComment', 0] },
                                    createdAt: '$$comment.createdAt',
                                    updatedAt: '$$comment.updatedAt',
                                },
                            },
                        },
                        commentCount: { $size: '$comments' },
                        createdAt: 1,
                        updatedAt: 1,
                    },
                },
                {
                    $sort: { createdAt: -1 },
                },
                {
                    $skip: +skip,
                },
                {
                    $limit: +limit,
                },
            ]);

            return res.status(200).json({ posts });
        } catch (error) {
            console.log('----error---', error);
            return res.status(500).json(error);
        }
    }

    async getUserPosts(req, res, next) {
        try {
            const limit = parseInt(req.query._limit) || 4;
            const skip = limit * req.query._skip;

            const userId = new ObjectId(req.query._userId);

            const posts = await Post.aggregate([
                {
                    // merge Post with Comments
                    $lookup: {
                        from: 'Comments',
                        localField: '_id',
                        foreignField: 'postId',
                        as: 'comments',
                    },
                },
                {
                    // merge Post with Users
                    $lookup: {
                        from: 'Users',
                        localField: 'author',
                        foreignField: '_id',
                        as: 'author',
                    },
                },
                {
                    // merge Comments with Users
                    $lookup: {
                        from: 'Users',
                        localField: 'comments.author',
                        foreignField: '_id',
                        as: 'authorComment',
                    },
                },
                {
                    $project: {
                        _id: 1,
                        content: 1,
                        video: 1,
                        image: 1,
                        likes: 1,
                        author: { $arrayElemAt: ['$author', 0] },
                        comments: {
                            $map: {
                                input: { $slice: ['$comments', 3] },
                                as: 'comment',
                                in: {
                                    _id: '$$comment._id',
                                    comment: '$$comment.comment',
                                    author: { $arrayElemAt: ['$authorComment', 0] },
                                    createdAt: '$$comment.createdAt',
                                    updatedAt: '$$comment.updatedAt',
                                },
                            },
                        },
                        commentCount: { $size: '$comments' },
                        createdAt: 1,
                        updatedAt: 1,
                    },
                },
                { $match: { 'author._id': userId } },
                {
                    $sort: { createdAt: -1 },
                },
                {
                    $skip: +skip,
                },
                {
                    $limit: +limit,
                },
            ]);

            return res.status(200).json({ posts });
        } catch (error) {
            console.error(error);
            res.status(500).json(error);
        }
    }

    async getPostDetail(req, res, next) {
        try {
            const postId = req.params.id;

            console.log(' postId:', postId);
            const post = await Post.findById({ _id: postId }).populate('author').lean();
            delete post.author.password;
            return res.status(200).json({ post });
        } catch (error) {
            console.log('error :', error);
            return res.status(500).json('Lỗi');
        }
    }

    async createPost(req, res, next) {
        try {
            const data = req.body;
            const post = await Post.create(data);
            res.status(200).json({ post });
        } catch (error) {
            return res.status(500).json('Lỗi');
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
            res.status(500).json('Failed to delete post');
        }
    }

    async likePost(req, res) {
        try {
            const userIdLiked = req.accessTokenPayload.user._id;
            const postId = req.params.id;

            const result = await Post.findById({ _id: postId });

            const index = result.likes.indexOf(userIdLiked);
            if (index > -1) {
                result.likes.splice(index, 1);
            } else {
                result.likes.push(userIdLiked);
            }
            result.save();
            res.status(200).json({ likes: result.likes.length });
        } catch (error) {
            console.log(error);
            res.status(500).json(error);
        }
    }
}

export default new PostController();
