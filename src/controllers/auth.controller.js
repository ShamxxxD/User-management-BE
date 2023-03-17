import User from '../models/user.model.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

class AuthController {
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

    // LOGIN USER
    async loginUser(req, res, next) {
        try {
            const { username, password } = req.body;

            const user = await User.findOne({ username });
            if (!user) return res.status(200).json({ msg: 'Username does not exist !', status: false });

            const validPassword = bcrypt.compareSync(password, user.password);
            if (!validPassword) return res.json({ msg: 'Incorrect password !', status: false });

            if (user && validPassword) {
                const accessToken = jwt.sign({ id: user.id, role: user.role }, process.env.JWT_ACCESS_KEY, {
                    expiresIn: '30m',
                });

                const refreshToken = jwt.sign({ id: user.id, role: user.role }, process.env.JWT_REFRESH_KEY, {
                    expiresIn: '365d',
                });

                res.cookie('refreshToken', refreshToken, { httpOnly: true, secure: false, sameSite: 'strict' });

                delete user._doc.password;
                res.status(200).json({ msg: 'Logged in successfully', user, accessToken, status: true });
            }
        } catch (error) {
            res.status(500).json(error);
        }
    }

    async logoutUser(req, res, next) {
        try {
            res.clearCookie('refreshToken');
            res.status(200).json({ msg: 'Logout successfully' });
        } catch (error) {
            res.status(500).json(error);
        }
    }

    // REFRESH TOKEN
    async refreshToken(req, res) {
        try {
            const refreshToken = req.cookies.refreshToken;
            if (!refreshToken) {
                res.status(401).json("You're not authenticated");
            }

            jwt.verify(refreshToken, process.env.JWT_REFRESH_KEY, (error, user) => {
                if (error) return res.status(401).json(error);

                const newAccessToken = jwt.sign({ id: user.id, role: user.role }, process.env.JWT_ACCESS_KEY, {
                    expiresIn: '30m',
                });

                res.status(200).json({ accessToken: newAccessToken });
            });
        } catch (error) {
            res.status(500).json(error);
        }
    }
}
export default new AuthController();
