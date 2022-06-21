const Joi = require('joi');

module.exports = (req, _res, next) => {
  const { displayName, email, password } = req.body;
  const { error } = Joi.object({
    displayName: Joi.string().min(8).required(),
    email: Joi.string().email().lowercase().required(),
    password: Joi.string().min(6).required(),
  }).validate({ displayName, email, password });

  if (error) {
    return next(error);
  }
  
  next();
};