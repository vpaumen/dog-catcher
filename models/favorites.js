module.exports = function(sequelize, DataTypes) {
  var Favorites = sequelize.define("Favorites", {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false
    },
    dogid: {
      type: DataTypes.INTEGER,
      required: true
    },
    dogName: {
      type: DataTypes.STRING,
      required: true
    }
  });

  Favorites.associate = function(models) {
    Favorites.belongsTo(models.Users, {
      foreignKey: {
        allowNull: false
      }
    });
  };

  return Favorites;
};
