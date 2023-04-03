import express from 'express';
const friendRoute = express.Router();
import verifyToken from '../middlewares/verifyToken.js';
import FriendController from '../controllers/friend.controller.js';

// Get a user's friends requests
friendRoute.get('/:userId/request', FriendController.getFriendRequests);

// Get a user's friends
friendRoute.get('/:userId', FriendController.getFriends);

// Add a friend
friendRoute.post('/', verifyToken.isValidToken, FriendController.addFriend);

// Update a friend's status
friendRoute.patch('/:friendId', verifyToken.isValidToken, FriendController.updateFriendStatus);

// Delete a friend
friendRoute.delete('/:friendId', verifyToken.isValidToken, FriendController.deleteFriend);

export default friendRoute;
