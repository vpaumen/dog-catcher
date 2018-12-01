var db = require("../models");

module.exports = function(app) {
  app.get("/api/Favorites", function(req, res) {
    var query = {};
    if (req.query.users_id) {
      query.UsersId = req.query.users_id;
    }
    db.Favorites.findAll({
      where: query,
      include: [db.Users]
    }).then(function(dbFavorites) {
      res.json(dbFavorites);
    });
  });

  // app.get("/api/favorites/:id", function(req, res) {
  //   db.Favorites.findOne({
  //     where: {
  //       id: req.params.id
  //     },
  //     include: [db.Users]
  //   }).then(function(dbFavorites) {
  //     res.json(dbFavorites);
  //   });
  // });

  app.post("/api/Favorites", function(req, res) {
    db.Favorites.create(req.body).then(function(dbFavorites) {
      res.json(dbFavorites);
    });
  });

  app.delete("/api/Favorites/:id", function(req, res) {
    db.Favorites.destroy({
      where: {
        id: req.params.id
      }
    }).then(function(dbFavorites) {
      res.json(dbFavorites);
    });
  });

  app.put("/api/Favorites", function(req, res) {
    db.Favorites.update(
      req.body,

      {
        where: {
          id: req.body.id
        }
      }
    ).then(function(dbFavorites) {
      res.json(dbFavorites);
    });
  });
};
