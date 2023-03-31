import express from 'express';
const messageRoute = express.Router();
import messageController from '../controllers/message.controller.js';

messageRoute.delete('/:conversationId', messageController.delete);
messageRoute.post('/', messageController.create);
messageRoute.get('/:conversationId', messageController.getUserMessages);

export default messageRoute;
