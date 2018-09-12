"use strict";

// Defines helper functions for saving and getting tweets, using the database `db`
module.exports = function makeDataHelpers(db) {
    return {

        // Saves a tweet to `db`
        saveTweet: function(newTweet, callback) {
            db.collection("tweets").insertOne(newTweet);
            callback(null, true);
        },

        // Get all tweets in `db`, sorted by newest first
        getTweets: function(callback) {
            const sortNewestFirst = (a, b) => a.created_at - b.created_at;
            db.collection("tweets").find().toArray(function(err, results) {
                callback(null, results.sort(sortNewestFirst));
            });
        }

    };
};

//commented out code is for my notes

//other way to get tweets with mongoDB
//db.collection('tweets').find().sort({created_at: 1}).toArray(callback);

//original gettweet without mongoDB
// getTweets: function(callback) {
//   simulateDelay(() => {
//     const sortNewestFirst = (a, b) => a.created_at - b.created_at;
//     callback(null, db.tweets.sort(sortNewestFirst));
//   });
// }

//original savetweet without mongoDB
//     saveTweet: function(newTweet, callback) {
//   simulateDelay(() => {
//     db.tweets.push(newTweet);
//     callback(null, true);
//   });
// },