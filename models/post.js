module.exports = function(sequelize, DataTypes) {
    var Post = sequelize.define("Post", {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          len: [1]
        }
      },
    });
    return Post;
  };
  