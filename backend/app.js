require('dotenv').config();

// eslint-disable-next-line no-console
console.log(process.env.NODE_ENV); // production

const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const { errors } = require('celebrate');
const cookieParser = require('cookie-parser');
const helmet = require('helmet');
const cors = require('cors');
const { limiter } = require('./utils/limiterConfig');
const { requestLogger, errorLogger } = require('./middlewares/logger');

const userRoutes = require('./routes/users');
const cardRoutes = require('./routes/cards');
const authRoutes = require('./routes/auth');

const auth = require('./middlewares/auth');
const errorHandler = require('./middlewares/errorHandler');

const NotFoundError = require('./utils/errors/notFoundError');

const { PORT = 3000, MONGODB = 'mongodb://127.0.0.1:27017/mestodb' } = process.env;

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(cookieParser());
app.use(helmet());
app.use(requestLogger);
app.use(limiter);

mongoose.connect(MONGODB);

app.get('/crash-test', () => {
  setTimeout(() => {
    throw new Error('Сервер сейчас упадёт');
  }, 0);
});

app.use('/', authRoutes);
app.use('/users', auth, userRoutes);
app.use('/cards', auth, cardRoutes);
app.use('*', auth, (req, res, next) => {
  next(new NotFoundError('Маршрут не найден'));
});

app.use(errorLogger);
app.use(errors());
app.use(errorHandler);

app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`App listening on port ${PORT}`);
});
