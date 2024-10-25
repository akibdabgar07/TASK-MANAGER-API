const Joi = require("joi");

module.exports = {
  registerInfo: Joi.object()
    .keys({
      email: Joi.string().required(),
      password: Joi.string().required(),
      firstName: Joi.string().required(),
      lastName: Joi.string().required(),
    })
    .options({ allowUnknown: true }),
};

module.exports = {
  login: Joi.object().keys({
    email: Joi.string().email().required(),
    password: Joi.string().required(),
  }),
};
