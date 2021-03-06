const postServices = require('../services/postServices');

const addNewBlogPost = async (req, res, next) => {
    const { title, content, categoryIds } = req.body;
    const userId = req.user.dataValues.id;

    const newBlogPost = await postServices.addNewBlogPost(title, content, categoryIds, userId);
  
    if (newBlogPost.error) return next(newBlogPost.error);
    res.status(201).json(newBlogPost);
  };

  const getAllBlogPost = async (_req, res, _next) => {
    const allBlogPost = await postServices.getAllBlogPost();
  
    res.status(200).json(allBlogPost);
  };
  
  const getPostById = async (req, res, next) => {
    const { id } = req.params;
    const post = await postServices.getPostById(id);
  
    if (post.error) return next(post.error);
    res.status(200).json(post);
  };

  const updatePost = async (req, res, next) => {
    const { title, content } = req.body;
    const { id } = req.params;
    const userId = req.user.dataValues.id;

    const updatedPost = await postServices.updatePost(title, content, id, userId);

    if (updatedPost.error) return next(updatedPost.error);
    res.status(200).json(updatedPost);
  };

  const deletePostById = async (req, res, next) => {
    const { id } = req.params;
    const userId = req.user.dataValues.id;

    const deletedPost = await postServices.deletePostById(id, userId);
  
    if (deletedPost.error) return next(deletedPost.error);
    res.status(204).json();
  };

  const searchPost = async (req, res, _next) => {
    const { q } = req.query;

    const posts = await postServices.searchPost(q);
    res.status(200).json(posts);
  };

  module.exports = {
    addNewBlogPost,
    getAllBlogPost,
    getPostById,
    updatePost,
    deletePostById,
    searchPost,
  };