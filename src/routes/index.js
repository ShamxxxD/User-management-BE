import userRoute from './user.route.js';
import authRoute from './auth.route.js';

export default function route(app) {
   app.use('/api/users', userRoute);
   app.use('/api/auth', authRoute);
}
