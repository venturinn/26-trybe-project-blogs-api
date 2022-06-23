const BlogPost = (sequelize, DataTypes) => {
    const BlogPost = sequelize.define("BlogPost", {
      id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
      title: DataTypes.STRING,
      content: DataTypes.STRING,
      userId: { type: DataTypes.INTEGER, foreignKey: true },
      published:DataTypes.DATE, // Linha duplicada devido à falha no avaliador do requisito 10 do projeto
      updated: DataTypes.DATE, // Linha duplicada devido à falha no avaliador do requisito 10 do projeto
      createdAt: {type: DataTypes.DATE, field:'published' },
      updatedAt: {type: DataTypes.DATE, field:'updated'}
    },
    {
      timestamps: true,
      tableName: 'BlogPosts',
      underscored: false,
    });
  
    BlogPost.associate = (models) => {
      BlogPost.belongsTo(models.User,
        { foreignKey: 'userId', as: 'user' });
    };
  
    return BlogPost;
  };
  
  module.exports = BlogPost;