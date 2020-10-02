// *********************************************************************************
// api-routes.js - this file offers a set of routes for displaying and saving data to the db
// *********************************************************************************

// Dependencies
// =============================================================

// Requiring our Video model
var db = require("../models");

// Routes
// =============================================================
module.exports = function(app) {

 // GET route for getting all of the videos
 app.get("/api/videos", function(req, res) {
  // findAll returns all entries for a table when used with no options
  db.Video.findAll({}).then(function(dbVideo) {
    // We have access to the videos as an argument inside of the callback function
    res.json(dbVideo);
  });
});

// POST route for saving a new video
app.post("/api/videos", function(req, res) {
  // create takes an argument of an object describing the item we want to
  // insert into our table. In this case we just we pass in an object with a text
  // and complete property (req.body)
  db.Video.create({
    text: req.body.text,
    complete: req.body.complete
  }).then(function(dbVideo) {
    // We have access to the new video as an argument inside of the callback function
    res.json(dbVideo);
  })
    .catch(function(err) {
    // Whenever a validation or flag fails, an error is thrown
    // We can "catch" the error to prevent it from being "thrown", which could crash our node app
      res.json(err);
    });
});

// DELETE route for deleting videos. We can get the id of the video to be deleted from
// req.params.id
app.delete("/api/videos/:id", function(req, res) {
  // We just have to specify which video we want to destroy with "where"
  db.Video.destroy({
    where: {
      id: req.params.id
    }
  }).then(function(dbVideo) {
    res.json(dbVideo);
  });

});

// PUT route for updating videos. We can get the updated video data from req.body
app.put("/api/videos", function(req, res) {

  // Update takes in an object describing the properties we want to update, and
  // we use where to describe which objects we want to update
  db.Video.update({
    text: req.body.text,
    complete: req.body.complete
  }, {
    where: {
      id: req.body.id
    }
  }).then(function(dbVideo) {
    res.json(dbVideo);
  })
    .catch(function(err) {
    // Whenever a validation or flag fails, an error is thrown
    // We can "catch" the error to prevent it from being "thrown", which could crash our node app
      res.json(err);
    });
  });
};
