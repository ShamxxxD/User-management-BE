import Comment from '../models/comment.model.js';

class CommentController {
    async getComments(req, res, next) {
        try {
            const limit = req.query._limit;
            const skip = req.query._skip * limit;
            const postId = req.query._postId;

            const comments = await Comment.find({ postId })
                .populate('author')
                .skip(skip)
                .limit(limit)
                .sort({ createdAt: -1 });
            const totalCommentCount = await Comment.countDocuments({ postId });

            res.status(200).json({ comments, totalCommentCount });
        } catch (error) {
            console.log(error);
            res.status(500).json(error);
        }
    }

    async createComment(req, res, next) {
        try {
            const postId = req.body._postId;
            const authorId = req.body._authorId;
            const comment = req.body._comment;

            const newComment = {
                comment,
                author: authorId,
                postId,
            };

            const response = await Comment.create(newComment);
            res.status(200).json(response);
        } catch (error) {
            res.status(500).json(error);
        }
    }

    async editComment(req, res, next) {
        try {
            const commentId = req.params.id;
            const newComment = req.body.newComment;
            console.log(' newComment:', newComment);

            const comment = await Comment.findByIdAndUpdate({ _id: commentId }, { comment: newComment }, { new: true });
            res.status(200).json(comment);
        } catch (error) {
            console.log(' error:', error);
            res.status(500).json(error);
        }
    }

    async deleteComment(req, res, next) {
        console.log(' Run:1');
        try {
            const commentId = req.params.id;
            const comment = await Comment.findByIdAndDelete({ _id: commentId });

            res.status(200).json(comment);
        } catch (error) {
            res.status(500).json(error);
        }
    }
}

export default new CommentController();
