const Joi = require('joi');

module.exports = (req, res, next) => {
  const { email, password } = req.body;
  const { error } = Joi.object({
    email: Joi.string().min(1).required(),
    password: Joi.string().min(1).required(),
  }).validate({ email, password });

  if (error) {
    return res.status(400).json({ message: 'Some required fields are missing' });
  }
  
  next();
};