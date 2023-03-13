import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import route from './routes/index.js';
import { connectDatabase } from './config/database/database.js';

import dotenv from 'dotenv';
dotenv.config();

const app = express();
console.log(process.env.PORT);
const port = process.env.PORT ?? 3002;

app.use(bodyParser.json());
app.use(cors());

connectDatabase();

// Route Init
route(app);

app.listen(port, () => {
     console.log(`Server started on port ${port}`);
});
