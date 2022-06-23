const { Op } = require('sequelize');
const {
  Category,
  BlogPost,
  PostCategory,
  User,
  sequelize,
} = require('../database/models');

const verifyCategoryIds = async (categoryIds) => {
  const allCategories = await Category.findAll();

  const areIdsOk = categoryIds.every((id) =>
    allCategories.some((element) => id === element.dataValues.id));

  return areIdsOk;
};

const addNewBlogPostDb = async (title, content, categoryIds, userId) => {
  let result = {};
  try {
    await sequelize.transaction(async (t) => {
      const newBlogPost = await BlogPost.create(
        { title, content, userId },
        { transaction: t },
      );
      const postId = newBlogPost.id;

      await Promise.all(
        categoryIds.map((categoryId) =>
          PostCategory.create({ postId, categoryId }, { transaction: t })),
      );

      result = newBlogPost;
    });
  } catch (e) {
    result = { error: { code: 'sequelizeError', message: e.message } };
  }
  return result;
};

const addNewBlogPost = async (title, content, categoryIds, userId) => {
  const areCategoryIdsOk = await verifyCategoryIds(categoryIds);
  if (!areCategoryIdsOk) {
    return {
      error: { code: 'invalidFields', message: '"categoryIds" not found' },
    };
  }

  const result = addNewBlogPostDb(title, content, categoryIds, userId);

  return result;
};

const getAllBlogPost = async () => {
  const allBlogPost = await BlogPost.findAll({
    include: [
      { model: User, as: 'user', attributes: { exclude: ['password'] } },
      { model: Category, as: 'categories', through: { attributes: [] } },
    ], 
    attributes: [
        'id', 'title', 'content', 'userId',
        ['published', 'published'],
        ['updated', 'updated'],
      ],
  });

  return allBlogPost;
};

const getPostById = async (id) => {
  const post = await BlogPost.findOne({
    where: { id },
    include: [
      { model: User, as: 'user', attributes: { exclude: ['password'] } },
      { model: Category, as: 'categories', through: { attributes: [] } },
    ],
    attributes: ['id', 'title', 'content', 'userId', ['published', 'published'],
        ['updated', 'updated'],
      ],
  });

  if (!post) {
    return { error: {
        code: 'notFound',
        message: 'Post does not exist',
      },
    };
  }

  return post;
};

const verifyPost = async (id, userId) => {
  const post = await getPostById(id);
  if (post.error) return post;

  if (post.userId !== userId) {
    return {
      error: {
        code: 'unauthorized',
        message: 'Unauthorized user',
      },
    };
  }

  return true;
};

const updatePost = async (title, content, id, userId) => {
  const isPostValid = await verifyPost(id, userId);
  if (isPostValid.error) return isPostValid;

  await BlogPost.update({ title, content }, { where: { id } });

  const postUpdated = await getPostById(id);

  return postUpdated;
};

const deletePostById = async (id, userId) => {
  const isPostValid = await verifyPost(id, userId);
  if (isPostValid.error) return isPostValid;

  const postDeleted = await BlogPost.destroy({ where: { id } });

  return postDeleted;
};

const searchPost = async (q) => {
  const posts = await BlogPost.findAll({
    where: {
      [Op.or]: [
        { title: { [Op.like]: `%${q}%` } },
        { content: { [Op.like]: `%${q}%` } },
      ],
    },
    include: [
      { model: User, as: 'user', attributes: { exclude: ['password'] } },
      { model: Category, as: 'categories', through: { attributes: [] } },
    ],
    attributes: [
      'id', 'title', 'content', 'userId',
      ['published', 'published'],
      ['updated', 'updated'],
    ],
  });

  return posts;
};

module.exports = {
  addNewBlogPost,
  getAllBlogPost,
  getPostById,
  updatePost,
  deletePostById,
  searchPost,
};
