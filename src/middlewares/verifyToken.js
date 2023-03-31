import jwt from 'jsonwebtoken';

class VerifyToken {
    async isValidToken(req, res, next) {
        try {
            const token = req.headers.token;

            if (token) {
                const accessToken = token.split(' ')[1];
                const secret = process.env.JWT_ACCESS_KEY;

                const isValidToken = jwt.verify(accessToken, secret);

                if (!isValidToken) {
                    return res.status(401).json('Invalid token');
                }

                next();
            } else {
                return res.status(401).json("You're not authenticated");
            }
        } catch (error) {
            return res.status(500).json(error);
        }
    }

    async isAdmin(req, res, next) {
        try {
            const token = req.headers.token;
            if (token) {
                const accessToken = token.split(' ')[1];
                const secret = process.env.JWT_ACCESS_KEY;

                const isValidToken = jwt.verify(accessToken, secret);

                if (!isValidToken) {
                    return res.status(401).json('Invalid token');
                }
                const role = isValidToken.user.role;
                const isAdmin = role === 'admin' ? true : false;
                if (!isAdmin) {
                    return res.status(401).json('You are not allowed to perform this action');
                }

                next();
            } else {
                return res.status(401).json("You're not authenticated");
            }
        } catch (error) {
            console.log(error);
            return res.status(500).json(error);
        }
    }
}

export default new VerifyToken();
