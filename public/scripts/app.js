/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

//creates the html
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

//tweet submit and error handling
function tweetSubmit() {
  const $error = $("#errorMessage");
    $("#tweet-form").submit(function (event) {
        $error.hide({
          opacity: "toggle"
        });
        $(".new-tweet").css( {"padding-bottom": "35px"});
      event.preventDefault();
      if ($(".text-box").val().length > 140) {
        $error.text("Error: Tweet cannot exceed 140 characters");
        $error.show({
          opacity: "toggle"
        });
        $(".new-tweet").css( {"padding-bottom": "25px"});
      } else if (!$(".text-box").val().length){
        $error.text("Error: Please enter a tweet");
        $error.show({
          opacity: "toggle"
        });
        $(".new-tweet").css( {"padding-bottom": "25px"});
      } else {
        $.ajax("/tweets", { data: $(this).serialize(),method: "POST",
            success: data => {
               loadTweets();
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

//helper function to help protect against XSS
function escape(str) {
  var div = document.createElement('div');
  div.appendChild(document.createTextNode(str));
  return div.innerHTML;
}

function toggleForm (){
  const $button = $("#compose");
  $button.on("click", function(){
    $(".new-tweet").animate({
      height: "toggle",
      opacity: "toggle"
    });
    $(".text-box").focus();
  });
}

$(document).ready(function() {
  tweetSubmit();
  loadTweets();
  toggleForm();
});


