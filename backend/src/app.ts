import express from 'express'
import mongoose from 'mongoose';

const { PORT = 3000 } = process.env;

const cors = require('cors');
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

mongoose.connect('mongodb://127.0.0.1:27017/weblarek');

app.use(cors());
app.listen(PORT, () => {
    console.log(`listening on port ${PORT} ;)`)
});