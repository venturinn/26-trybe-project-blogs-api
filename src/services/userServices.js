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
        code: 'userAlreadyRegistered',
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

module.exports = {
  validateLogin,
  addNewUser,
  getAllUsers,
};
