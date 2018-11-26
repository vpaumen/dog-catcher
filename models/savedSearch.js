module.exports = function(sequelize, DataTypes) {
  var savedSearch = sequelize.define("saved_search", {
    id: {
      type: DataTypes.INTEGER,
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

  savedSearch.associate = function(models) {
    savedSearch.belongsTo(models.users, {
      foreignKey: {
        allowNull: false
      }
    });
  };

  return savedSearch;
};
