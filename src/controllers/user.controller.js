import User from '../models/user.model.js';

class UserController {
   async getAllUsers(req, res) {
      try {
         //TODO lean .lean() and apply
         const users = await User.find({});
         res.json({ users: users });
      } catch (error) {
         res.status(404).json(error);
      }
   }

   async deleteUser(req, res) {
      //TODO change userID => userId
      const userID = req.params.id;
      try {
         //TODO find one user by id => why you use variable users ?
         const users = await User.findByIdAndDelete({ _id: userID });
         res.json({ users: users });
      } catch (error) {
         res.status(404).json(error);
      }
   }
}
export default new UserController();
