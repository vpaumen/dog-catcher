module.exports = function(sequelize, DataTypes) {
  var Favorites = sequelize.define("favorites", {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    dogid: {
      type: DataTypes.VARCHAR,
      required: true
    },
    dogName: {
      type: DataTypes.STRING,
      required: true
    }
  });

  favorites.associate = function(models) {
    favorites.belongsTo(models.users, {
      foreignKey: {
        allowNull: false
      }
    });
  };

  return Favorites;
};
