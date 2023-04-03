import User from '../models/user.model.js';
import Friend from '../models/friend.model.js';

class FriendController {
    static async getFriends(req, res) {
        try {
            const user = await User.findById(req.params.userId);
            
            if (!user) {
                return res.status(404).send('User not found');
            }
            
                const friends = await Friend.find({
                    $or: [
                        { user: req.params.userId, status: 'accepted' },
                        { friend: req.params.userId, status: 'accepted' }
                    ]
                }).populate('friend').populate('user')
    
            return res.send({ friends });
        } catch (error) {
            console.error(error);
            return res.status(500).send('Server error');
        }
    }

    static async getFriendRequests(req, res) {
        try {
            const user = await User.findById(req.params.userId);
            if (!user) {
                return res.status(404).send('User not found');
            }
            const friends = await Friend.find({ friend: req.params.userId, status: 'pending' }).populate('user');
            return res.send({ friends });
        } catch (error) {
            console.error(error);
            return res.status(500).send('Server error');
        }
    }

    static async addFriend(req, res) {
        try {
            const userId = req.accessTokenPayload.user._id;
            const friendID = req.body._friendId;

            const user = await User.findById(userId);
            if (!user) {
                return res.status(404).send('User not found');
            }

            const friend = await User.findById(friendID);

            if (!friend) {
                return res.status(404).send('Friend not found');
            }

            const existingFriend = await Friend.findOne({ user: user._id, friend: friend._id });
            if (existingFriend) {
                return res.status(400).send('Friend already added');
            }

            const newFriend = new Friend({
                user: user._id,
                friend: friend._id,
                status: 'pending',
            });

            await newFriend.save();
            return res.send(newFriend);
        } catch (error) {
            console.error(error);
            return res.status(500).send('Server error');
        }
    }

    static async updateFriendStatus(req, res) {
        try {
            const userId = req.accessTokenPayload.user._id;
            const friendId = req.params.friendId;

            const friend = await Friend.findOne({ user: friendId, friend: userId });

            if (!friend) {
                return res.status(404).send('Friend not found');
            }

            friend.status = req.body.status;
            await friend.save();
            return res.send(friend);
        } catch (error) {
            console.error(error);
            return res.status(500).send('Server lỗi');
        }
    }

    static async deleteFriend(req, res) {
        try {
            const userId = req.accessTokenPayload.user._id;
          
            const user = await User.findById(userId);
            if (!user) {
                return res.status(404).send('User not found');
            }
            const friend = await Friend.findOneAndDelete({
                $or: [
                    { user: req.params.friendId,},
                    { friend: req.params.friendId, }
                ]
            });
      
            return res.status(200).json('Friend removed');
        } catch (error) {
            console.error(error);
            return res.status(500).send('Server error');
        }
    }
}

export default FriendController;
