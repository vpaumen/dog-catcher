var db = require("../models");

module.exports = function(app) {
  app.get("/api/users/:id", function(req, res) {
    db.Users.findOne({
      where: {
        id: req.params.id
      },
      include: [db.SavedSearch, db.Favorites]
    }).then(function(dbUsers) {
      res.json(dbUsers);
    });
  });

  app.post("/api/Users", function(req, res) {
    db.Users.create(req.body).then(function(dbUsers) {
      res.json(dbUsers);
    });
  });

  app.delete("/api/Users/:id", function(req, res) {
    db.Users.destroy({
      where: {
        id: req.params.id
      }
    }).then(function(dbUsers) {
      res.json(dbUsers);
    });
  });

  app.put("/api/Users:id", function(req, res) {
    db.Users.update(
      req.body,

      {
        where: {
          id: req.body.id
        }
      }
    ).then(function(dbUsers) {
      res.json(dbUsers);
    });
  });
};
