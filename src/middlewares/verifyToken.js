import jwt from 'jsonwebtoken';

// const verifyToken = {
//    isValidToken: (req, res, next) => {
//       const token = req.headers.token;
//       if (token) {
//          const accessToken = token.split(' ')[1];
//          jwt.verify(accessToken, process.env.JWT_ACCESS_KEY, (err, user) => {
//             if (err) {
//                return res.status(403).json('Token is not valid');
//             }
//             req.user = user;
//             next();
//          });
//       } else {
//          return res.status(401).json("You're not authenticated");
//       }
//    },

//    isValidTokenAndIsAdmin: (req, res, next) => {
//       verifyToken.verifyToken(req, res, () => {
//          const isAdmin = req.user.role === 'admin' ? true : false;
//          if (req.user.id == req.params.id || isAdmin) {
//             next();
//          } else {
//             return res.status(403).json("You're not allowed to delete other");
//          }
//       });
//    },
// };

// export default verifyToken;

class VerifyToken {
   async isValidToken(req, res, next) {
      try {
         const token = req.headers.token;
         console.log(token);
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
         console.log(error);
      }
   }
}

export default new VerifyToken();
