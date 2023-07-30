const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const validator = require('validator');
const UnauthorizedError = require('../utils/errors/unauthorizedError');
const { isURL } = require('../utils/constants');

const userSchema = mongoose.Schema({
  name: {
    type: String,
    minength: 2,
    maxlength: 30,
    default: 'Жак-Ив Кусто',
  },
  about: {
    type: String,
    minlength: 2,
    maxlength: 30,
    default: 'Исследователь',
  },
  avatar: {
    type: String,
    default: 'https://pictures.s3.yandex.net/resources/jacques-cousteau_1604399756.png',
    validate: {
      validator: (v) => isURL.test(v),
      message: 'Некорректный адрес URL',
    },
  },
  email: {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator: (v) => validator.isEmail(v),
      message: 'Неправильный формат почты',
    },
  },
  password: {
    type: String,
    required: true,
    select: false,
  },
});

// eslint-disable-next-line func-names
userSchema.statics.findUserByCredentials = function ({ email, password }) {
  return this.findOne({ email }).select('+password')
    .orFail(() => new UnauthorizedError('Пользователь не найден'))
    .then((user) => {
      if (!user) {
        return Promise.reject(new UnauthorizedError('Неверно указана почта или пароль'));
      }
      return bcrypt.compare(password, user.password)
        .then((matched) => {
          if (!matched) {
            return Promise.reject(new UnauthorizedError('Неверно указана почта или пароль'));
          }
          return user;
        });
    });
};

userSchema.methods.toJSON = function passwordDelete() {
  const user = { ...this.toObject() };
  delete user.password;
  return user;
};

module.exports = mongoose.model('user', userSchema);
