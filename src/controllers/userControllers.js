require('dotenv').config();
const jwt = require('jsonwebtoken');
const userServices = require('../services/userServices');

const secret = process.env.JWT_SECRET;

const validateLogin = async (req, res, next) => {
  const { email, password } = req.body;

  const validadeUser = await userServices.validateLogin(email, password);

  if (validadeUser.error) return next(validadeUser.error);

  const jwtConfig = {
    expiresIn: '7d',
    algorithm: 'HS256',
  };

  const token = jwt.sign({ data: email }, secret, jwtConfig);

  res.status(200).json({ token });
};

const addNewUser = async (req, res, next) => {
  const { displayName, email, password, image } = req.body;

  const newUserAdded = await userServices.addNewUser(
    displayName,
    email,
    password,
    image,
  );

  if (newUserAdded.error) return next(newUserAdded.error);

  const jwtConfig = {
    expiresIn: '7d',
    algorithm: 'HS256',
  };

  const token = jwt.sign({ data: email }, secret, jwtConfig);

  res.status(201).json({ token });
};

const getAllUsers = async (_req, res, _next) => {
  const allUsers = await userServices.getAllUsers();

  res.status(200).json(allUsers);
};

const getUserById = async (req, res, next) => {
  const { id } = req.params;
  const user = await userServices.getUserById(id);

  if (user.error) return next(user.error);
  res.status(200).json(user);
};

const deleteUser = async (req, res, next) => {
  const userId = req.user.dataValues.id;
  const userDeleted = await userServices.deleteUser(userId);

  if (userDeleted.error) return next(userDeleted.error);
  res.status(204).json();
};

module.exports = {
  validateLogin,
  addNewUser,
  getAllUsers,
  getUserById,
  deleteUser,
};
