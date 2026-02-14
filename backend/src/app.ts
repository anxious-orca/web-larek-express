import express from 'express'
import mongoose from 'mongoose';
import path from 'path';
import { errors } from 'celebrate';
import router from './routes/index';

const { PORT = 3000 } = process.env;

const cors = require('cors');
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

mongoose.connect('mongodb://127.0.0.1:27017/weblarek');

app.use(cors());
app.use('/', router);
app.use(express.static(path.join(__dirname, 'public')));
app.use(errors());

app.listen(PORT, () => {
    console.log(`listening on port ${PORT} ;)`)
});