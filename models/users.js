module.exports = function(sequelize, DataTypes) {
  var Users = sequelize.define("users", {
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
      type: DataTypes.VARCHAR,
      required: true
    }
  });

  Users.associate = function(models) {
    Users.hasMany(models.savedSearch, {
      onDelete: "cascade"
    });
  };
  return Users;
};
