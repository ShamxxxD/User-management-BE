import User from '../models/user.model.js';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

class UserController {
    async getAllUsers(req, res) {
        try {
            const users = await User.find({}).lean();
            res.status(200).json({ users });
        } catch (error) {
            res.status(404).json(error);
        }
    }

    async getUserDetail(req, res) {
        const userId = req.params.userId;
        console.log('Run');
        console.log(userId);
        try {
            const user = await User.findById({ _id: userId }).lean();
            res.status(200).json({ user });
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
    // REGISTER USER
    async registerUser(req, res, next) {
        try {
            const { username, email, password } = req.body;

            const isAdmin = username.startsWith('admin');

            const role = isAdmin ? 'admin' : 'subscriber';

            const usernameCheck = await User.findOne({ username }).lean();
            if (usernameCheck) return res.json({ msg: 'Username already used ', status: false });

            const emailCheck = await User.findOne({ email }).lean();
            if (emailCheck) return res.json({ msg: 'Email already used ', status: false });

            const hashedPassword = await bcrypt.hash(password, 10);

            const user = await User.create({
                username,
                email,
                password: hashedPassword,
                role,
            });

            return res.json({ msg: 'Create new user successfully', user, status: true });
        } catch (error) {
            return res.status(500).json(error);
        }
    }

    async changePassword(req, res) {
        try {
            const userId = req.params.id;
            const { currentPassword, newPassword } = req.body.data || req.body;

            const user = await User.findById({ _id: userId });

            const validPassword = bcrypt.compareSync(currentPassword, user.password);
            if (!validPassword) return res.status(400).json({ msg: 'Incorrect password !', status: false });

            const hashedPassword = await bcrypt.hash(newPassword, 10);
            user.password = hashedPassword;

            const result = await user.save();
            if (!result) return res.status(501).json({ msg: 'Failed to update password !', status: false });

            delete result._doc.password;

            const accessToken = jwt.sign({ result }, process.env.JWT_ACCESS_KEY, {
                expiresIn: '30m',
            });

            res.status(200).json({ user: result, accessToken });
        } catch (error) {
            res.status(404).json(error);
        }
    }

    async editUser(req, res) {
        try {
            const userId = req.params.id;
            const data = req.body.data || req.body;
            const user = await User.findByIdAndUpdate({ _id: userId }, data, { new: true });
            // user trả về dữ liệu cũ
            delete user._doc.password;

            const accessToken = jwt.sign({ user }, process.env.JWT_ACCESS_KEY, {
                expiresIn: '30m',
            });

            res.status(200).json({ user, accessToken });
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
