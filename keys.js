//console.log('this is loaded');

exports.twitter = {
  consumer_key: process.liri.env.TWITTER_CONSUMER_KEY,
  consumer_secret: process.liri.env.TWITTER_CONSUMER_SECRET,
  access_token_key: process.liri.env.TWITTER_ACCESS_TOKEN_KEY,
  access_token_secret: process.liri.env.TWITTER_ACCESS_TOKEN_SECRET
};

exports.spotify = {
  id: process.liri.env.SPOTIFY_ID,
  secret: process.liri.env.SPOTIFY_SECRET
};