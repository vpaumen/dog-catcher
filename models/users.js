module.exports = function(sequelize, DataTypes) {
  var Users = sequelize.define("Users", {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false
    },
    username: {
      type: DataTypes.STRING,
      required: true
    },
    password: {
      type: DataTypes.STRING,
      required: true
    },
    email: {
      type: DataTypes.STRING,
      required: true
    }
  });

  Users.associate = function(models) {
    Users.hasMany(models.SavedSearch, {
      onDelete: "cascade"
    });
  };

  Users.associate = function(models) {
    Users.hasMany(models.Favorites, {
      onDelete: "cascade"
    });
  };
  return Users;
};
