import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import route from './routes/index.js';
import { connectDatabase } from './config/database/database.js';

import cookieParser from 'cookie-parser';
import dotenv from 'dotenv';
import { Server } from 'socket.io';
import http from 'http';

const app = express();

const server = http.createServer(app);
const io = new Server(server);
dotenv.config();

const port = process.env.PORT ?? 3002;

let users = [];
io.on('connection', socket => {
    console.log('A user connected');
    socket.on('addUser', userId => {
        addUser(userId, socket.id);
        io.emit('getUsers', users);
    });
});

const addUser = (userId, socketId) => {
    !users.some(user => user.userId === userId) && users.push({ userId, socketId });
};

app.use(cookieParser());
app.use(bodyParser.json());
app.use(
    cors({
        origin: process.env.ORIGIN_CLIENT_URL,
        credentials: true,
        optionsSuccessStatus: 200,
    })
);

connectDatabase();

// Route Init
route(app);

app.listen(port, () => {
    console.log(`Server started on port ${port}`);
});
