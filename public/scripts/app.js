/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

// Test / driver code (temporary). Eventually will get this from the server.
// Fake data taken from tweets.json
const data = [
  // {
  //   "user": {
  //     "name": "Newton",
  //     "avatars": {
  //       "small":   "https://vanillicon.com/788e533873e80d2002fa14e1412b4188_50.png",
  //       "regular": "https://vanillicon.com/788e533873e80d2002fa14e1412b4188.png",
  //       "large":   "https://vanillicon.com/788e533873e80d2002fa14e1412b4188_200.png"
  //     },
  //     "handle": "@SirIsaac"
  //   },
  //   "content": {
  //     "text": "If I have seen further it is by standing on the shoulders of giants"
  //   },
  //   "created_at": 1461116232227
  // },
  // {
  //   "user": {
  //     "name": "Descartes",
  //     "avatars": {
  //       "small":   "https://vanillicon.com/7b89b0d8280b93e2ba68841436c0bebc_50.png",
  //       "regular": "https://vanillicon.com/7b89b0d8280b93e2ba68841436c0bebc.png",
  //       "large":   "https://vanillicon.com/7b89b0d8280b93e2ba68841436c0bebc_200.png"
  //     },
  //     "handle": "@rd" },
  //   "content": {
  //     "text": "Je pense , donc je suis"
  //   },
  //   "created_at": 1461113959088
  // },
  // {
  //   "user": {
  //     "name": "Johann von Goethe",
  //     "avatars": {
  //       "small":   "https://vanillicon.com/d55cf8e18b47d4baaf60c006a0de39e1_50.png",
  //       "regular": "https://vanillicon.com/d55cf8e18b47d4baaf60c006a0de39e1.png",
  //       "large":   "https://vanillicon.com/d55cf8e18b47d4baaf60c006a0de39e1_200.png"
  //     },
  //     "handle": "@johann49"
  //   },
  //   "content": {
  //     "text": "Es ist nichts schrecklicher als eine tätige Unwissenheit."
  //   },
  //   "created_at": 1461113796368
  // }
];


function createTweetElement(db){
  const $tweet = $("<article>").addClass("tweet");
  const header = `<header class="tweet-header">
                    <img class="avatar" src="${escape(db.user.avatars.small)}">
                    <strong class="userName">${escape(db.user.name)}</strong>
                    <small class="user">${escape(db.user.handle)}</small>
                  </header>`
  const body = `<p class="tweet-body">${escape(db.content.text)}</p>`;
  const timeCreated = new Date(db.created_at).toLocaleTimeString();
  const footer = `<footer class="timeStamp">${escape(timeCreated)}
                    <p class="icons">
                      <i class="fas fa-flag"></i>
                      <i class="fas fa-retweet"></i>
                      <i class="fas fa-heart"></i>
                    </p>
                  </footer>`;

  $tweet.append(header);
  $tweet.append(body);
  $tweet.append(footer);

  return $tweet;

}

function renderTweet(a) {
  a.forEach(function (tweet){
    $("#tweets-container").prepend(createTweetElement(tweet));
  });
}

function tweetSubmit() {
    $("#tweet-form").submit(function (event) {
      event.preventDefault();
      if ($(".text-box").val().length > 140) {
        alert("Tweet too long!!");
      } else if (!$(".text-box").val().length){
        alert("Please enter tweet!");
      } else {
        $.ajax(
          "/tweets",
          {
            data: $(this).serialize(),
            method: "POST",
            success: data => {
              // fill me in
               loadTweets();
              // check for success status code
              // else error in submitting data
            }
          });
      }
      });
  };

function loadTweets() {
    $.ajax("/tweets", { method: "GET" })
    .then(function (tweets) {
      renderTweet(tweets);
    });
}

function escape(str) {
  var div = document.createElement('div');
  div.appendChild(document.createTextNode(str));
  return div.innerHTML;
}

$(document).ready(function() {
  tweetSubmit();
  loadTweets();
});


