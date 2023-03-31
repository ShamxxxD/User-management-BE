import Conversation from '../models/conversation.js';

class ConversationController {
    // post /api/conversations
    async create(req, res) {
        try {
            const members = [req.body.senderId, req.body.receiverId];

            const conversation = await Conversation.create({ members });
            res.json({ conversation });
        } catch (error) {
            console.log(error);
            res.status(500).json(error);
        }
    }

    // get /api/conversations/:userId
    async getUserConversation(req, res) {
        try {
            const userId = req.params.userId;
            const conversations = await Conversation.find({ members: { $in: [userId] } });
            res.json({ conversations });
        } catch (error) {
            console.log(error);
            res.status(500).json(error);
        }
    }

    // delelte /api/conversations/:conversationId
    async delete(req, res) {
        try {
            const conversationId = req.params.conversationId;
            const conversation = await Conversation.findByIdAndDelete({ _id: conversationId });
            res.json({ conversation });
        } catch (error) {
            console.log(error);
            res.status(500).json(error);
        }
    }
}

export default new ConversationController();
