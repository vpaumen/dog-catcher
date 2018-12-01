var db = require("../models");

module.exports = function(app) {
  app.get("/api/SavedSearch", function(req, res) {
    var query = {};
    if (req.query.users_id) {
      query.UsersId = req.query.users_id;
    }
    db.SavedSearch.findAll({
      where: query,
      include: [db.Users]
    }).then(function(dbSavedSearch) {
      res.json(dbSavedSearch);
    });
  });

  // app.get("/api/savedSearch/:id", function(req, res) {
  //   db.SavedSearch.findOne({    // .findAll
  //     where: {
  //       id: req.params.id
  //     },
  //     include: [db.Users]
  //   }).then(function(dbSavedSearch) {
  //     res.json(dbSavedSearch);
  //   });
  // });

  /* app.post("/api/SavedSearch", function(req, res) {
    db.SavedSearch.create(req.body).then(function(dbSavedSearch) {
      res.json(dbSavedSearch);
    });
  }); */

  app.post("/api/savedsearch", function(req, res) {
    console.log(req.body);
    db.SavedSearch.create(
     /*  zip: req.body.zip,
      breeds: req.body.breeds,
      sizes: req.body.sizes,
      sexes: req.body.sexes,
      ages: req.body.ages,
      userId: req.body.userId */
      req.body
      )
      .then(function(dbUsers) {
        res.json(dbUsers);
      });
  });

  app.delete("/api/SavedSearch/:id", function(req, res) {
    db.SavedSearch.destroy({
      where: {
        id: req.params.id
      }
    }).then(function(dbSavedSearch) {
      res.json(dbSavedSearch);
    });
  });

  app.put("/api/SavedSearch", function(req, res) {
    db.SavedSearch.update(
      req.body,

      {
        where: {
          id: req.body.id
        }
      }
    ).then(function(dbSavedSearch) {
      res.json(dbSavedSearch);
    });
  });
};
