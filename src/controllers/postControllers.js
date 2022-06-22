const postServices = require('../services/postServices');

const addNewBlogPost = async (req, res, next) => {
    const { title, content, categoryIds } = req.body;
    const userId = req.user.dataValues.id;

    const newBlogPost = await postServices.addNewBlogPost(title, content, categoryIds, userId);
  
    if (newBlogPost.error) return next(newBlogPost.error);
    res.status(201).json(newBlogPost);
  };
  
  module.exports = {
    addNewBlogPost,
  };