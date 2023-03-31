import userRoute from './user.route.js';
import authRoute from './auth.route.js';
import postRoute from './post.route.js';
import commentRoute from './comment.route.js';
import conversationRoute from './conversation.route.js';
import messageRoute from './message.route.js';

export default function route(app) {
    app.use('/api/users', userRoute);
    app.use('/api/auth', authRoute);
    app.use('/api/posts', postRoute);
    app.use('/api/comments', commentRoute);
    app.use('/api/conversations', conversationRoute);
    app.use('/api/messages', messageRoute);
}
