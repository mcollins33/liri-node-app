# liri-node-app

This app creates LIRI, a Language Interpretation and Recognition Interface.  The user simply types in, node liri.js, in Git Bash or Terminal and one of the following commands to retrieve results.

my-tweets
spotify-this-song
movie-this
do-what-it-says

my-tweets will display my last 20 tweets and when they were created.  If there are less than 20 tweets, it will only display that many tweets.

spotify-this-song will display information on a particular song which can be entered as the 4th parameter in quotation marks.  If the desired result is not returned, inputting the song along with the artist name may help.  If a song is not entered, information on "The Sign" by "Ace of Base" will be returned.

movie-this will display information on a particular movie which can also be entered as the 4th parameter in quotation marks.  If a movie is not specified, results will be returned for the movie "Mr. Nobody."

The last option, do-what-it-says will run either spotify-this-song or movie-this depending on what is specified in the text file random.txt.  The information in random.txt must be entered in this format: spotify-this-song,"I Want It That Way"

All of the options will return information in Git Bash or Terminal in addition to the file log.txt.

This app was created using JavaScript and node.js.

