var request = require("request");
/* var db = require("../models"); */

module.exports = function(app) {
  app.get("/api/petfinder", function(req, res) {
    request("https://api.petfinder.com/pet.find?key=183129c808bcae5ded4b21a86b0a1ddc&format=json&location=21202", function(error, response, body) {
      console.log('error:', error); // Print the error if one occurred
      console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
      console.log('body:', body); // Print the HTML for the Google homepage.
      res.json(JSON.parse(body));
    });

    /*  var dbExamples = {
      name: "Jordan",
      age: 21
    }; */

    console.log("got to apiRoutes!");
    /* res.json(body); */
  });
};
