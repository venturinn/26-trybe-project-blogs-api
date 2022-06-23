const Joi = require('joi');

module.exports = (req, res, next) => {
  const { title, content /*  categoryIds */ } = req.body;
  const { error } = Joi.object({
    title: Joi.string().min(1).required(),
    content: Joi.string().min(1).required(),
  //  categoryIds: Joi.array().min(1).required(), // Ver se afeta outros requisitos 
  }).validate({ title, content /* categoryIds */ });

  if (error) {
    return res.status(400).json({ message: 'Some required fields are missing' });
  }
  
  next();
};