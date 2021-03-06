const { User } = require('../database/models');

const validateLogin = async (email, password) => {
  const user = await User.findOne({ where: { email, password } });

  if (!user) {
    return {
      error: {
        code: 'invalidFields',
        message: 'Invalid fields',
      },
    };
  }

  return user;
};

const addNewUser = async (displayName, email, password, image) => {
  const isUserAlreadyRegistered = await User.findOne({ where: { email } });

  if (isUserAlreadyRegistered) {
    return {
      error: {
        code: 'alreadyRegistered',
        message: 'User already registered',
      },
    };
  }

  const newUser = await User.create({ displayName, email, password, image });

  return newUser;
};

const getAllUsers = async () => {
  const allUsers = await User.findAll();

  const allUserWithoutPassword = [];

  allUsers.forEach((user) => {
    allUserWithoutPassword.push({
      id: user.id,
      displayName: user.displayName,
      email: user.email,
      image: user.image,
    });
  });

  return allUserWithoutPassword;
};

const getUserById = async (id) => {
  const user = await User.findByPk(id);

  if (!user) {
    return {
      error: {
        code: 'notFound',
        message: 'User does not exist',
      },
    };
  }

  const userWithoutPassword = {
    id: user.id,
    displayName: user.displayName,
    email: user.email,
    image: user.image,
  };

  return userWithoutPassword;
};

const deleteUser = async (id) => {
  let result = {};
  try {
    const deletedUser = await User.destroy({ where: { id } });
    result = deletedUser;
  } catch (e) {
    result = { error: { code: 'sequelizeError', message: e.message } };
  }
  return result;
};

module.exports = {
  validateLogin,
  addNewUser,
  getAllUsers,
  getUserById,
  deleteUser,
};
