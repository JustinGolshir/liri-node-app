require("dotenv").config();


// Imports the keys javascript file and stores it as a variable

var keys = require("./keys.js");



var spotify = new Spotify(keys.spotify);
var client = new Twitter(keys.twitter);