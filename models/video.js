module.exports = function(sequelize, DataTypes) {
  var Video = sequelize.define("Video", {
    text: DataTypes.STRING,
    complete: DataTypes.BOOLEAN
  });
  return Video;
};

  
