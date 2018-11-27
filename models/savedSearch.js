module.exports = function(sequelize, DataTypes) {
  var SavedSearch = sequelize.define("SavedSearch", {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false
    },
    dogSex: {
      type: DataTypes.STRING,
      required: false
    },
    dogBreed: {
      type: DataTypes.STRING,
      required: false
    },
    dogSize: {
      type: DataTypes.STRING,
      required: false
    },
    dogAge: {
      type: DataTypes.STRING,
      required: false
    },
    zipcode: {
      type: DataTypes.INTEGER,
      required: true
    }
  });

  SavedSearch.associate = function(models) {
    SavedSearch.belongsTo(models.Users, {
      foreignKey: {
        allowNull: false
      }
    });
  };

  return SavedSearch;
};
