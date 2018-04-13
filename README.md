# LIRI BOT

## Overview

Welcome to LIRI bot. LIRI is like iPhone's SIRI. However, while SIRI is a Speech Interpretation and Recognition Interface, LIRI is a _Language_ Interpretation and Recognition Interface. LIRI is a command line node app that takes in parameters and gives you back data.

LIRI is a clever little bot. LIRI can perform various functions including displaying a users latest tweets from Twitter, displaying track information from Spotify, displaying movie information from OMDB

## Technologies Used

* Node.js
* JavaScript
* Twitter API (via twitter npm module)
* Spotify API (via spotify npm module)
* OMDb API (via request npm module)

## Getting Started

In order for the app to work you will need to install the following Node packages. 

* [Twitter](https://www.npmjs.com/package/twitter)
* [Node-Spotify-API](https://www.npmjs.com/package/node-spotify-api)
* [Request](https://www.npmjs.com/package/request)
* [DotEnv](https://www.npmjs.com/package/dotenv)

We will use the node packages to send requests to Twitter, Spotify and OMDB APIs in order to retrieve the data requests from the command line.
     
### Instructions

1. Navigate to the root of your project and run `npm init -y` this will initialize a `package.json` file for your project. The `package.json` file is required for installing third party npm packages and saving their version numbers. If you fail to initialize a `package.json` file, it will be troublesome, and at times almost impossible for anyone else to run your code after cloning your project.

2. Make a .gitignore file and add the following lines to it. This will tell git not to track these files, and thus they won't be committed to Github.

```
node_modules
.DS_Store
.env
```
3. Make a JavaScript file named `keys.js`.

* Inside keys.js your file will look like this:

```js
console.log('this is loaded');

exports.twitter = {
  consumer_key: process.env.TWITTER_CONSUMER_KEY,
  consumer_secret: process.env.TWITTER_CONSUMER_SECRET,
  access_token_key: process.env.TWITTER_ACCESS_TOKEN_KEY,
  access_token_secret: process.env.TWITTER_ACCESS_TOKEN_SECRET
};

exports.spotify = {
  id: process.env.SPOTIFY_ID,
  secret: process.env.SPOTIFY_SECRET
};
```

4. Next, create a file named `.env`, add the following to it, replacing the values with your API keys (no quotes) once you have them:
```

* This file will be used by the `dotenv` package to set what are known as environment variables to the global `process.env` object in node. These are values that are meant to be specific to the computer that node is running on, and since we are gitignoring this file, they won't be pushed to github &mdash; keeping our API key information private.

4. Get your Twitter API keys by following these steps:

   * Step One: Visit <https://apps.twitter.com/app/new>
   
   * Step Two: Fill out the form with dummy data. Type `http://google.com` in the Website input. Don't fill out the Callback URL input. Then submit the form.
   
   * Step Three: On the next screen, click the Keys and Access Tokens tab to get your consume key and secret. 
     
     * Copy and paste them into your .env file, replacing the `your-twitter-consumer-key` and `your-twitter-consumer-secret` placeholders.
   
   * Step Four: At the bottom of the page, click the `Create my access token` button to get your access token key and secret. 
     
     * Copy the access token key and secret displayed at the bottom of the next screen. Paste them into your .env file, replacing the placeholders for `your-twitter-access-token-key` and `your-twitter-access-token-secret`.

6. Make a file called `random.txt`.

   * Inside of `random.txt` put the following in with no extra characters or white space:
     
     * spotify-this-song,"I Want it That Way"

7. Make a JavaScript file named `liri.js`

8. At the top of the `liri.js` file, add code to read and set any environment variables with the dotenv package:

```js
require("dotenv").config();
```

9. Add the code required to import the `keys.js` file and store it in a variable.
  
* You should then be able to access your keys information like so

  ```js
  var spotify = new Spotify(keys.spotify);
  var client = new Twitter(keys.twitter);
  ```

### LIRI Bot Commands

1. `node liri.js my-tweets`

   * This will show your last 20 tweets and when they were created in the terminal/bash window.

https://github.com/JustinGolshir/liri-node-app/blob/master/assets/screenshots/Tweets.jpg

2. `node liri.js spotify-this-song '<song name here>'`

   * This will show the following information about the song in your terminal/bash window
     * Artist(s)
     * The song's name
     * A preview link of the song from Spotify
     * The album that the song is from
   * If no song is provided then the program will default to "The Sign" by Ace of Base.

https://github.com/JustinGolshir/liri-node-app/blob/master/assets/screenshots/Spotify.jpg

3. `node liri.js movie-this '<movie name here>'`

   * This will output the following information to your terminal/bash window:
     ```
       * Title of the movie.
       * Year the movie came out.
       * IMDB Rating of the movie.
       * Rotten Tomatoes Rating of the movie.
       * Country where the movie was produced.
       * Language of the movie.
       * Plot of the movie.
       * Actors in the movie.
     ```

   * If the user doesn't type a movie in, the program will output data for the movie 'Mr. Nobody.'

https://github.com/JustinGolshir/liri-node-app/blob/master/assets/screenshots/OMDB.jpg

4. `node liri.js do-what-it-says`

    * LIRI will take the text inside of random.txt and then use it to call one of LIRI's commands. 
    * For example, Liri will run `spotify-this-song` for "I Want it That Way," as follows the text in `random.txt`.

https://github.com/JustinGolshir/liri-node-app/blob/master/assets/screenshots/TextFile.jpg