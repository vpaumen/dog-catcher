var db = require("../models");

module.exports = function(app) {
  app.get("/api/savedSearch", function(req, res) {
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
  //   db.SavedSearch.findOne({
  //     where: {
  //       id: req.params.id
  //     },
  //     include: [db.Users]
  //   }).then(function(dbSavedSearch) {
  //     res.json(dbSavedSearch);
  //   });
  // });

  app.post("/api/savedSearch", function(req, res) {
    db.SavedSearch.create(req.body).then(function(dbSavedSearch) {
      res.json(dbSavedSearch);
    });
  });

  app.delete("/api/savedSearch/:id", function(req, res) {
    db.SavedSearch.destroy({
      where: {
        id: req.params.id
      }
    }).then(function(dbSavedSearch) {
      res.json(dbSavedSearch);
    });
  });

  app.put("/api/savedSearch", function(req, res) {
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
