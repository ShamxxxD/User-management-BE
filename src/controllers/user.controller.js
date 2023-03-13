import User from '../models/user.model.js';

class UserController {
     async getUsers(req, res) {
          const users = await User.find({});
          res.json({ users: users });
     }

     async createUser(req, res) {
          const users = await User.create({
               name: 'Hồ Quốc Thông',
          });

          res.json(users);
     }
}
export default new UserController();
