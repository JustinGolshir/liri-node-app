// Must require the dotenv
require("dotenv").config();

// Imports the keys javascript file and stores it as a variable
var keys = require("./keys.js");

// Capture user commands and query
var command = process.argv[2];
var query = process.argv[3];

//1. Twitter - display 20 tweets and when they were created at in the terminal/bash window
var myTweets = function() {

    // This loads the npm twitter module
    var Twitter = require('twitter');

    // Bring in Twitter keys to access API
    var client = new Twitter(keys.twitter);

    // Parameters for Twitter API request
    var params = {screen_name: 'djjustix'};
    
    // GET request for for user statuses
    client.get('statuses/user_timeline', params, function(error, tweets, response) {
        if (error) {console.log(error);
        } else {
            console.log("My 20 latest tweets");
            console.log("")
            for(var i = 0; i < tweets.length; i++) {
                console.log((i + 1) + ". " + tweets[i].text);
                console.log("Created:  " + tweets[i].created_at);
                console.log("");
            }
        }
    });
}

// 2. Spotify - this-song - node liri.js spotify-this-song '<song name here>
 var spotifyThisSong = function(trackQuery) {

    // This loads the npm Spotify module
    var Spotify = require('node-spotify-api');

    // Bring in Spotify keys to access API
    var spotify = new Spotify(keys.spotify);

    // If no song is provided, we will default to "The Sign" by Ace of Base.
    if (trackQuery === undefined) {
        trackQuery = "The sign ace of base";
    }

    spotify.search({ type: 'track', query: trackQuery }, function(error, data) {
        if (error) {console.log(error);
        } else {
            for(var i = 0; i < data.tracks.items[0].artists.length; i++) {
                if(i === 0) {
                    console.log("Artist(s):    " + data.tracks.items[0].artists[i].name);
                } else {
                    console.log("              " + data.tracks.items[0].artists[i].name);
                }
            }
            console.log("Song:         " + data.tracks.items[0].name);
            console.log("Preview Link: " + data.tracks.items[0].preview_url);
            console.log("Album:        " + data.tracks.items[0].album.name);
        }
    });
}

// 3. movie-this - node liri.js movie-this '<movie name here>'
var movieThis = function(movieQuery) {

    // This loads the npm request module
    var request = require("request");

    // If no movie is provided, we will default to "Mr. Nobody".
    if (movieQuery === undefined) {
        movieQuery = "Mr. Nobody";
    }

    // Runs HTTP GET request to the OMDB API with the movie specified
    request("http://www.omdbapi.com/?t=" + movieQuery +  "&y=&plot=short&apikey=trilogy", function(error, response, body) {
    
    // This line is just to help us debug against the actual URL.
    console.log(movieQuery);

    // If the request is successful (i.e. if the response status code is 200)
    if (!error && response.statusCode === 200) {

        // Parse the body of the site and recover just the various values
        // (Note: The syntax below for parsing isn't obvious. Just spend a few moments dissecting it).
        console.log("Title: " + JSON.parse(body).Title);
        console.log("Year: " + JSON.parse(body).Year);
        console.log("IMDB Rating: " + JSON.parse(body).imdbRating);
        console.log("Rotten Tomatoes Rating: " + JSON.parse(body).tomatoRating);
        console.log("Country: " + JSON.parse(body).Country);
        console.log("Language: " + JSON.parse(body).Language);
        console.log("Plot: " + JSON.parse(body).Plot);
        console.log("Actors: " + JSON.parse(body).Actors);
        }

    });

}

// User inputs that run the app
if (command === "my-tweets") {
    myTweets();
} else if (command === "spotify-this-song") {
    spotifyThisSong(query); 
} else if (command === "movie-this") {
    movieThis(query);
} else if (command === "do-what-it-says") {

    // Using the `fs` Node package, LIRI will take the text inside of random.txt and then use it to call one of LIRI's commands.
    var fs = require("fs");

    fs.readFile("random.txt", "utf-8", function (error, data) {
        var command;
        var query;

        // Split string from file 
        if(data.indexOf(",") !== -1) {
			var dataArr = data.split(",");
			command = dataArr[0];
			query = dataArr[1];
		} else {
			command = data;
		}

		// After reading the command from the file, decides which app function to run
		if(command === "my-tweets") {
		    myTweets();
		} else if (command === "spotify-this-song") {
		    spotifyThisSong(query);
		} else if (command === "movie-this") {
            movieThis(query);
        } else { // Use case where the command is not recognized
            console.log("Please enter a valid command to run LIRI.")
        }
    });
    
} else if(command === undefined) { // Scenario for when a command is not given
	console.log("Please enter a valid ommand to run LIRI.")
} else { // Scenario when a command is given but not recognized
	console.log("Command not recognized. Please try again.")
}