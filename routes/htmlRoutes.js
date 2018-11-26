var path = require("path");

module.exports = function(app) {

  app.get("/", function(req, res) {
    res.sendFile(path.join(__dirname, "../views/index.handlebars"));
  });

  app.get("/", function(req, res) {
    res.sendFile(path.join(__dirname, "../views/results.handlebars"));
  });

  app.get("/", function(req, res) {
    res.sendFile(path.join(__dirname, "../views/users.handlebars"));
  });

  app.get("/", function(req, res) {
    res.sendFile(path.join(__dirname, "../views/faq.handlebars"));
  });

  app.get("*", function(req, res) {
    res.render("404");
  });
};
