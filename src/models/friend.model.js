import mongoose, { Schema } from 'mongoose';

const FriendSchema = new Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Users',
            required: true,
        },
        friend: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Users',
            required: true,
        },
        status: {
            type: String,
            enum: ['pending', 'accepted', 'rejected'],
            required: true,
        },
    },
    { timestamps: true }
);

const Friend = mongoose.model('Friends', FriendSchema, 'Friends');

export default Friend;
