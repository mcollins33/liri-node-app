var twitterK = require("./keys.js");
twitterK = twitterK.twitterKeys;

var spotifyK = require("./keys.js");
spotifyK = spotifyK.spotifyKeys;

var fs = require("fs");


function searchTwitter(arg3) {
    var Twitter = require('twitter');

    var client = new Twitter({
        consumer_key: twitterK.consumer_key,
        consumer_secret: twitterK.consumer_secret,
        access_token_key: twitterK.access_token_key,
        access_token_secret: twitterK.access_token_secret
    });

    var params = { screen_name: 'MikiCollins4' };
    client.get('statuses/user_timeline', params, function(error, tweets, response) {
        if (!error) {
            // console.log(tweets);
        }

        var tweetArray = tweets;
        var arrayLength = tweetArray.length;

        for (var i = 0; i < 20; i++) {
            if (tweetArray[i]) {
                console.log("\nTweet: " + tweetArray[i].text);
                console.log("Created: " + tweetArray[i].created_at + "\n");
                fs.appendFile("log.txt", "\nTweet: " + tweetArray[i].text);
                fs.appendFile("log.txt", "\nCreated: " + tweetArray[i].created_at + "\n");
            }
        }
    });
}


function searchSong(arg3) {
    if (typeof(arg3) === "undefined") {
        var songTitle = "The sign ace of base";
    } else {
        var songTitle = arg3;
    }

    var Spotify = require('node-spotify-api');

    var spotify = new Spotify({
        id: spotifyK.client_id,
        secret: spotifyK.client_secret
    });

    spotify.search({ type: 'track', query: "track:" + songTitle, limit: 1 }, function(err, data) {
        if (err) {
            return console.log('Error occurred: ' + err);
        }

        // var searchResult = data.tracks.items[0];
        // console.log(searchResult);
        var artists = data.tracks.items[0].album.artists[0].name;
        console.log("\nArtist/s: " + artists);
        fs.appendFile("log.txt", "\nArtist/s: " + artists);
        var songName = data.tracks.items[0].name;
        console.log("Song Name: " + songName);
        fs.appendFile("log.txt", "\nSong Name: " + songName);
        var previewLink = data.tracks.items[0].preview_url;
        console.log("Preview Link: " + previewLink);
        fs.appendFile("log.txt", "\nPreview Link: " + previewLink);
        var album = data.tracks.items[0].album.name;
        console.log("Album: " + album);
        fs.appendFile("log.txt", "\nAlbum: " + album + "\n");
    });
}


function searchMovie(arg3) {
    if (typeof(arg3) === "undefined") {
        var movieTitle = "Mr Nobody";
    } else {
        var movieTitle = arg3;
    }

    console.log(movieTitle);

    var request = require('request');
    request("https://www.omdbapi.com/?t=" + movieTitle + "&apikey=trilogy", function(error, response, body) {
        // console.log('error:', error); // Print the error if one occurred
        // console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
        // console.log(body); // Print the HTML for the Google homepage.

        var response = JSON.parse(body);
        // console.log(response);
        var movie = response.Title;
        console.log("\nMovie Title: " + movie);
        fs.appendFile("log.txt", "\nMovie Title: " + movie);
        var year = response.Year;
        console.log("Year Released: " + year);
        fs.appendFile("log.txt", "\nYear Released: " + year);
        var imdbRating = response.imdbRating;
        console.log("IMDB Rating: " + imdbRating);
        fs.appendFile("log.txt", "\nIMDB Rating: " + imdbRating);
        var rottenTomatoRating = response.Ratings[1].Value;
        console.log("Rotten Tomatoes Rating: " + rottenTomatoRating);
        fs.appendFile("log.txt", "\nRotten Tomatoes Rating: " + rottenTomatoRating);
        var country = response.Country;
        console.log("Country Produced: " + country);
        fs.appendFile("log.txt", "\nCountry Produced: " + country);
        var language = response.Language;
        console.log("Language: " + language);
        fs.appendFile("log.txt", "\nLanguage: " + language);
        var plot = response.Plot;
        console.log("Plot: " + plot);
        fs.appendFile("log.txt", "\nPlot: " + plot);
        var actors = response.Actors;
        console.log("Actors: " + actors);
        fs.appendFile("log.txt", "\nActors: " + actors + "\n");
    });
}

if (process.argv[2] === "my-tweets") {
    searchTwitter();
} else if (process.argv[2] === "spotify-this-song") {
    searchSong(process.argv[3]);
} else if (process.argv[2] === "movie-this") {
    searchMovie(process.argv[3]);
} else if (process.argv[2] === "do-what-it-says") {
    var fs = require("fs");
    fs.readFile("random.txt", "utf8", function(error, data) {
        if (error) {
            console.log(error);
        }
        var dataArr = data.split(",");
        var command = dataArr[0];
        var input = dataArr[1];

        if (command === "my-tweets") {

        } else if (command === "spotify-this-song") {
            searchSong(input);
        } else if (command === "movie-this") {
            searchMovie(input);
        } else {
            console.log("This command is not recognized");
        }
    })

} else {
    console.log("This command is not recognized");
}