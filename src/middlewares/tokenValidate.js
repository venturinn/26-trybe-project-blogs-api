const jwt = require('jsonwebtoken');

const secret = process.env.JWT_SECRET;

const { User } = require('../database/models');

module.exports = async (req, res, next) => {
  const token = req.headers.authorization;

  if (!token) {
    return res.status(401).json({ message: 'Token not found' });
  }

  try {
    const decoded = jwt.verify(token, secret);
    const user = await User.findOne({ where: { email: decoded.data } });

    if (!user) {
      return res
        .status(401)
        .json({ message: 'Expired or invalid token' });
    }

    req.user = user; // Enviado para possível uso os próximos requisitos
    next();
  } catch (err) {
    return res.status(401).json({ message: 'Expired or invalid token' });
  }
};