import express from 'express';
const conversationRoute = express.Router();
import conversationController from '../controllers/conversation.controller.js';

conversationRoute.delete('/:conversationId', conversationController.delete);
conversationRoute.post('/', conversationController.create);
conversationRoute.get('/:userId', conversationController.getUserConversation);

export default conversationRoute;
