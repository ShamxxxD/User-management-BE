import jwt from 'jsonwebtoken';

class VerifyToken {
   async isValidToken(req, res, next) {
      try {
         const token = req.headers.token;
         if (token) {
            const accessToken = token?.split(' ')[1];
            jwt.verify(accessToken, process.env.JWT_ACCESS_KEY, (err, user) => {
               if (err) {
                  return res.status(403).json('Token is not valid');
               }
               req.user = user;
               next();
            });
         } else {
            return res.status(401).json("You're not authenticated");
         }
      } catch (error) {
         return res.status(500).json(error);
      }
   }

   async isAdmin(req, res, next) {
      try {
         const role = req.user.role;
         const isAdmin = role === 'admin' ? true : false;

         if (!isAdmin) {
            return res.status(401).json('You are not allowed to perform this action');
         }
         next();
      } catch (error) {
         return res.status(500).json(error);
      }
   }
}

export default new VerifyToken();
