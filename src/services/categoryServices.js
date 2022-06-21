const { Category } = require('../database/models');

const addNewCategory = async (name) => {
    const isCategoryAlreadyRegistered = await Category.findOne({ where: { name } });
  
    if (isCategoryAlreadyRegistered) {
      return {
        error: {
          code: 'alreadyRegistered',
          message: 'Category already registered',
        },
      };
    }
  
    const newCategory = await Category.create({ name });
  
    return newCategory;
  };

  module.exports = {
    addNewCategory,
  };
