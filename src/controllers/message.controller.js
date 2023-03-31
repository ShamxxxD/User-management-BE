import Message from '../models/message.js';

class MessageController {
    // post /api/messages
    async create(req, res) {
        try {
            const data = req.body;

            const message = await Message.create(data);

            res.json({ message });
        } catch (error) {
            console.log(error);
            res.status(500).json(error);
        }
    }

    // get /api/messages/:conversationId
    async getUserMessages(req, res) {
        try {
            const conversationId = req.params.conversationId;
            const messages = await Message.find({ conversationId });
            console.log(messages);
            res.status(200).json({ messages });
        } catch (error) {
            console.log(error);
            res.status(500).json(error);
        }
    }

    // delelte /api/conversations/:conversationId
    async delete(req, res) {
        try {
            const conversationId = req.params.conversationId;
            const conversation = await Message.findByIdAndDelete({ _id: conversationId });
            res.json({ conversation });
        } catch (error) {
            console.log(error);
            res.status(500).json(error);
        }
    }
}

export default new MessageController();
