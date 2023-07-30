const { Joi, celebrate } = require('celebrate');
const { isURL } = require('../constants');

module.exports.validateCreateCard = celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30).required(),
    link: Joi.string().required().pattern(isURL),
  }),
});

module.exports.validateCardById = celebrate({
  params: Joi.object().keys({
    id: Joi.string().required().hex().length(24),
  }),
});
