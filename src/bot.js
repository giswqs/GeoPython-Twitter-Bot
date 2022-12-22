const Twit = require("twit");
const config = require("./config");
const TwitterBot = new Twit(config);

// API

const retweet = () => {

  const tags = ["#geospatial", "#geopython", "#leafmap", "#geemap", "#jupyter", "#mapping"];
  const count = 20;

  for (let i = 0; i < tags.length; i++) {
  
    const params = {
      q: tags[i],
      result_type: "recent",
      count: count,
      lang: "en",
    };
    TwitterBot.get("search/tweets", params, (err, data) => {
      // when no errors
      if (!err) {
        console.log(`====> Number of ${tags[i]} Tweets: ${data.statuses.length}`);
        for (let i = 0; i < data.statuses.length; i++) {
          let retweetID = data.statuses[i].id_str;
          TwitterBot.post(
            "statuses/retweet/:id",
            { id: retweetID },
            (err, res) => {
              if (res) {
                console.log(`====> RETWEET SUCCESS ${retweetID}`);
              }
              if (err) {
                console.log(`====> ERROR in RETWEET ${err}`);
              }
            }
          );        
        }        
  
      } else {
        console.log(`====> ERROR ${err}`);
      }  
  }
  );
}}

retweet();
