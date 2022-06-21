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
  module.exports = {
    validateLogin,
  };