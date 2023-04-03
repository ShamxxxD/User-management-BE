import mongoose from 'mongoose';
const { Schema } = mongoose;

const CommentSchema = new Schema(
    {
        comment: {
            type: String,
            required: true,
        },
        author: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Users',
            required: true,
        },
        postId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Posts',
            required: true,
        },
    },
    { timestamps: true }
);

const Comment = mongoose.model('Comments', CommentSchema, 'Comments');

export default Comment;
