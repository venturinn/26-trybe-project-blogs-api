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

  module.exports = {
    validateLogin,
    addNewUser,
  };