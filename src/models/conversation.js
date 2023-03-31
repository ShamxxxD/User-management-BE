import mongoose from 'mongoose';
const { Schema } = mongoose;

const ConversationSchema = new Schema(
    {
        members: { type: Array },
    },
    { timestamps: true }
);

const Conversation = mongoose.model('Conversations', ConversationSchema, 'Conversations');

export default Conversation;
