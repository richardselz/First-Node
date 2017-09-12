var fs = require("fs");
var request = require("request");
var Spotify = require("node-spotify-api");
var Twitter = require("twitter");
var keys = require("./keys.js");

var Twit = new Twitter(keys.twitterKeys, 'json');
var Spot = new Spotify(keys.spotifyKeys, 'json');

var readArr = [];
var inputVal1 = process.argv[2];
var inputVal2 = process.argv[3];
if(process.argv[4]){
    for(var i = 4; i < process.argv.length; i++){
        inputVal2 += process.argv[i];
    }
}

//Twitter call and returns
function myTweets() {
    console.log("In the myTweets function!");
    // keys.twitterKeys
    console.log(keys.twitterKeys);
    // requests go below
    queryURL = "https://api.twitter.com/1.1/statuses/user_timeline.json?count=20";
    Twit.request(queryURL, (err, data, body) =>{
        if(err){
            console.log(err);
        }
        console.log("Body Length: ",body[3]);
        console.log(body.screen_name+" created the post "+body.text+" on "+body.created_at);
    });
}

//spotify call and return
function spotifySong() {
    console.log("In the spotifySong function!");
    // keys.spotifyKeys
    var songName = "The Sign  Ace of Base";
    if(inputVal2) {
        songName = inputVal2;
    }
    // requests go below
    queryURL = "https://api.spotify.com/v1/search?q="+songName+"&type=track&offset=0&limit=1";
    // request(queryURL, (err, response) => {
    //     console.log(response);
    // });
    // console.log(queryURL);
    // console.log("Keys: ",keys.spotifyKeys);
    Spot.request(queryURL, function(err,data) {
        if(err){
            return console.log("Error: "+err);
        }
        var spot = data.tracks.items[0].album;
        // console.log("Spotify Data: ",spot);
        console.log("Artist(s): "+ spot.artists[0].name);
        console.log("Song Name: "+data.tracks.items[0].name);
        console.log("Preview Link: "+spot.external_urls.spotify);
        console.log(data.tracks.items[0].name+" is apart of the "+spot.name+" album created by "+spot.artists[0].name);
    });

        // console.log("The Artist is: "+spotifyData.);
}

/*DONE*/
//omdb call and return
function movieThis() {
    var movieName = "Mr. Nobody";
    if(inputVal2){
        movieName = inputVal2;
    }
    // requests go below
    var queryURL = "http://www.omdbapi.com/?t=" + movieName + "&y=&plot=short&apikey=40e9cece";
    request(queryURL, (err, response, body) => {
        if(!err && response.statusCode === 200){
            var movieData = JSON.parse(body);
            console.log("Title of the Movie: "+movieData.Title);
            console.log("Year the "+movieData.Title+" was Released: "+movieData.Released);
            console.log("IMDB Rating of "+movieData.Title+" is: "+movieData.Ratings[0].Value);
            console.log("IMDB Rating of "+movieData.Title+" is: "+movieData.Ratings[1].Value);
            console.log("Country where "+movieData.Title+" was produced is: "+movieData.Country);
            console.log("Plot of "+movieData.Title+" is: "+movieData.Plot);
            console.log("Actors in "+movieData.Title+" were: "+movieData.Actors);
        }
    })
}


//do what the file random.txt says to do
function doWhat() {
    console.log("In the doWhat function!");
    fs.readFile("random.txt", "utf8", (err, data) =>{
        if(err) {
            console.log("Error: ",err);
        }
        readArr = data.split(',');
        inputVal1 = readArr[0];
        inputVal2 = readArr[1];
        // console.log("Do what: input1: ",inputVal1," input2: ",inputVal2);
        inputCheck();
    });
}

function inputCheck() {
    switch (inputVal1){
        case "my-tweets":
            myTweets();
            break;
        case "spotify-this-song":
            spotifySong();
            break;
        case "movie-this":
            movieThis();
            break;
        case "do-what-it-says":
            doWhat();
            break;
        default:
            console.log("Your entry didn't seem to match a function.");
    }
}

inputCheck();