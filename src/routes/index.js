import userRoute from './user.route.js';

export default function route(app) {
     app.use('/users', userRoute);
}
