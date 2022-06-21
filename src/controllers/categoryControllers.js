const categoryServices = require('../services/categoryServices');

const addNewCategory = async (req, res, next) => {
    const { name } = req.body;
    const category = await categoryServices.addNewCategory(name);
  
    if (category.error) return next(category.error);
    res.status(201).json(category);
  };
  
  const getAllCategories = async (_req, res, _next) => {
    const allCategories = await categoryServices.getAllCategories();
  
    res.status(200).json(allCategories);
  };

  module.exports = {
    addNewCategory,
    getAllCategories,
  };