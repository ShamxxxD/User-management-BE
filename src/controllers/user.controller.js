import User from '../models/user.model.js';

class UserController {
   async getAllUsers(req, res) {
      try {
         const users = await User.find({}).lean();
         res.json({ users: users });
      } catch (error) {
         res.status(404).json(error);
      }
   }

   async deleteUser(req, res) {
      const userId = req.params.id;
      console.log(userId);
      try {
         const user = await User.findByIdAndDelete({ _id: userId });
         res.json({ user });
      } catch (error) {
         res.status(404).json(error);
      }
   }
}
export default new UserController();
