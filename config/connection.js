var sequelize = require("sequelize");
// on line 3 victor changed var Sequelize to sequelize(lowercase)
var sequelize = new Sequelize("sequelize_dogcatcher", "tester1", "apple20", {
  host: "thepaumens.com",
  port: 3306,
  dialect: "mysql",
  pool: {
    max: 5,
    min: 0,
    idle: 10000
  }
});

module.exports = sequelize;
