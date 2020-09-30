module.exports = function(sequelize, DataTypes) {
    var Video = sequelize.define("Video", {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          len: [1,140]
        }
      },
    });
    return Video;
  };
  