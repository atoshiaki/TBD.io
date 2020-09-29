// *********************************************************************************
// api-routes.js - this file offers a set of routes for displaying and saving data to the db
// *********************************************************************************

// Dependencies
// =============================================================

// Requiring our Todo model
var db = require("./models");

// Routes
// =============================================================
module.exports = function(app) {

  // GET route for getting all of the posts
  app.get("/api/posts/", function(req, res) {
    db.Post.findAll({})
      .then(function(dbPost) {
        res.json(dbPost);
      });
  });

 // POST route for saving a new post
 app.post("/api/posts", function(req, res) {
  console.log(req.body);
  db.Post.create({
    name: req.params.name
  })
    .then(function(dbPost) {
      res.json(dbPost);
    });
});

// DELETE route for deleting posts
app.delete("/api/posts/:name", function(req, res) {
  db.Post.destroy({
    where: {
      name: req.params.name
    }
  })
    .then(function(dbPost) {
      res.json(dbPost);
    });
  });
};