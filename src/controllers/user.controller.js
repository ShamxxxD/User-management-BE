import User from '../models/user.model.js';

class UserController {
   async getAllUsers(req, res) {
      try {
         const users = await User.find({}).lean();
         res.json({ users });
      } catch (error) {
         res.status(404).json(error);
      }
   }

   async getUsersPagination(req, res) {
      try {
         const page = parseInt(req.query.page) || 1;
         const limit = parseInt(req.query.limit) || 10;
         const offset = (page - 1) * limit;

         const countTotalUsers = await User.find({}).count().lean();
         const users = await User.find({}).skip(offset).limit(limit).lean();

         res.status(200).json({ users, countTotalUsers });
      } catch (error) {
         res.status(404).json(error);
      }
   }

   async editUser(req, res) {
      const userId = req.params.id;
      const data = req.body.data;
      try {
         const user = await User.findByIdAndUpdate({ _id: userId }, data);
         res.json({ user });
      } catch (error) {
         res.status(404).json(error);
      }
   }

   async deleteUser(req, res) {
      const userId = req.params.id;
      try {
         const user = await User.findByIdAndDelete({ _id: userId });
         res.json({ user });
      } catch (error) {
         res.status(404).json(error);
      }
   }
}
export default new UserController();
