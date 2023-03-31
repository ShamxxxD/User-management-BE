import mongoose from 'mongoose';
const { Schema } = mongoose;

const CommentSchema = new Schema(
    {
        content: { type: Array, require: false },
        post: { type: Schema.Types.ObjectId, ref: 'Posts', required: true },
    },
    { timestamps: true }
);

const Comment = mongoose.model('Comments', CommentSchema, 'Comments');

export default Comment;
