var db = require("../models");

module.exports = function(app) {
  app.get("/users", function(req, res) {
    res.render("users");
  });

  app.get("/faq", function(req, res) {
    res.render("faq");
  });

  app.get("/", function(req, res) {
    res.render("index");
  });

  app.get("/results", function(req, res) {
    res.render("results");
  });

  /* app.get("/api/petfinder", function(req, res) {
    var dbExamples = {
      name: "Jordan",
      age: 21
    };

    console.log("got to apiRoutes!");
    res.json(dbExamples);
  }); */

  // Load index page
  // app.get("/", function(req, res) {
  //   db.Example.findAll({}).then(function(dbExamples) {
  //     res.render("index", {
  //       msg: "Welcome!",
  //       examples: dbExamples
  //     });
  //   });
  // });

  // Load example page and pass in an example by id
  app.get("/example/:id", function(req, res) {
    db.Example.findOne({ where: { id: req.params.id } }).then(function(dbExample) {
      res.render("example", {
        example: dbExample
      });
    });
  });

  // Render 404 page for any unmatched routes
  app.get("*", function(req, res) {
    res.render("404");
  });
};
