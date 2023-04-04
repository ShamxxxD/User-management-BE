import User from '../models/user.model.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

class AuthController {
    // LOGIN USER
    async loginUser(req, res, next) {
        try {
            const { username, password } = req.body;

            const user = await User.findOne({ username });
            if (!user) return res.status(200).json({ msg: 'Username does not exist !', status: false });

            const validPassword = bcrypt.compareSync(password, user.password);
            if (!validPassword) return res.json({ msg: 'Incorrect password !', status: false });

            if (user && validPassword) {
                delete user._doc.password;

                const accessToken = jwt.sign({ user }, process.env.JWT_ACCESS_KEY, {
                    expiresIn: '30s',
                });

                const refreshToken = jwt.sign({ user }, process.env.JWT_REFRESH_KEY, {
                    expiresIn: '365d',
                });

                res.cookie('refreshToken', refreshToken, { httpOnly: true, secure: false, sameSite: 'strict' });

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
              return res.status(401).json("You're not authenticated");
            }

            jwt.verify(refreshToken, process.env.JWT_REFRESH_KEY, (error, user) => {
                if (error) return res.status(401).json(error);

                const newAccessToken = jwt.sign({ user: user.user }, process.env.JWT_ACCESS_KEY, {
                    expiresIn: '30s',
                });
                res.status(200).json({ accessToken: newAccessToken });
            });
        } catch (error) {
            res.status(500).json(error);
        }
    }
}
export default new AuthController();
