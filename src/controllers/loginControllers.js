require('dotenv').config();
const jwt = require('jsonwebtoken');
const loginServices = require('../services/loginServices');

const secret = process.env.JWT_SECRET;

const validateLogin = async (req, res, next) => {
    const { email, password } = req.body;

   const validadeUser = await loginServices.validateLogin(email, password);

    if (validadeUser.error) return next(validadeUser.error);

    const jwtConfig = {
        expiresIn: '7d',
        algorithm: 'HS256',
      };

    const token = jwt.sign({ data: email }, secret, jwtConfig);
  
    res.status(200).json({ token });
  };

  module.exports = {
    validateLogin,
  };