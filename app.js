// app.js
const Twitter = require("twitter");
const config = require("./config.js");

const T = new Twitter(config);

const params = {
  q: "#dedbumkum",
};

setInterval(likeTweet, 1000 * 30);

function likeTweet() {
  T.get("search/tweets", params, (err, data, response) => {
    if (!err) {
      console.log(data.statuses);
      for (let i = 0; i < data.statuses.length; i++) {
        let id = { id: data.statuses[i].id_str };

        T.post("favorites/create", id, function (err, response) {
          if (err) {
            console.log(err[0].message);
          } else {
            let username = response.user.screen_name;
            let tweetId = response.id_str;
            console.log(
              "Favorited: ",
              `https://twitter.com/${username}/status/${tweetId}`
            );
          }
        });
      }
    } else {
      console.log(err);
    }
  });
}
