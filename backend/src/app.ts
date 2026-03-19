import express from 'express'
import mongoose from 'mongoose';
import path from 'path';
import { errors } from 'celebrate';
import { config } from './config';
import router from './routes/index';
import { requestLogger, errorLogger } from './middlewares/logger';
import errorHandler from './middlewares/error-handler';
import limiter from './middlewares/rate-limiter';
import NotFoundError from './errors/not-found-error';

const cors = require('cors');
const app = express();

app.use(requestLogger);

app.use(limiter);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

mongoose.connect(config.dbAdress);

app.use(cors());
app.use('/', router);
app.use(express.static(path.join(__dirname, 'public')));

app.use('*', (_req, _res, next) => {
  return next(new NotFoundError('Route not found'));
});

app.use(errorLogger);
app.use(errors());
app.use(errorHandler);

app.listen(config.port, () => {
    console.log(`listening on port ${config.port} ;)`)
});