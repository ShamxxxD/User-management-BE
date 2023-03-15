import User from '../models/user.model.js';

class UserController {
   async getAllUsers(req, res) {
      try {
         const users = await User.find({});
         res.json({ users: users });
      } catch (error) {
         res.status(404).json(error);
      }
   }

   async deleteUser(req, res) {
      const userID = req.params.id;
      try {
         const users = await User.findByIdAndDelete({ _id: userID });
         res.json({ users: users });
      } catch (error) {
         res.status(404).json(error);
      }
   }
}
export default new UserController();
