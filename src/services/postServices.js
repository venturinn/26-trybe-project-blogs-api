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
     include: 
     [{ model: User, as: 'user', attributes: { exclude: ['password'] } }, 
     { model: Category, as: 'categories', through: { attributes: [] } }], // O porquê do uso do "througt" ainda não está claro!

    });
  
    return allBlogPost;
  };

module.exports = {
  addNewBlogPost,
  getAllBlogPost,
};
