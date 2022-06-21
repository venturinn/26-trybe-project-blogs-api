const categoryServices = require('../services/categoryServices');

const addNewCategory = async (req, res, next) => {
    const { name } = req.body;
    const category = await categoryServices.addNewCategory(name);
  
    if (category.error) return next(category.error);
    res.status(201).json(category);
  };
  
  module.exports = {
    addNewCategory,
  };