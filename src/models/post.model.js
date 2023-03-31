import mongoose from 'mongoose';
const { Schema } = mongoose;

const PostSchema = new Schema(
    {
        content: { type: String, require: false },
        author: { type: Schema.Types.ObjectId, ref: 'Users', required: true },
        video: { type: String },
        image: { type: String },
    },
    { timestamps: true }
);

const Post = mongoose.model('Posts', PostSchema, 'Posts');

export default Post;
