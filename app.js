const express = require("express");
// const morgan = require("morgan");
const cors = require("cors");
const bodyParse = require("body-parser");
require("dotenv/config");

const app = express();
const port = process.env.PORT || 3030;

// import Routes
app.use("/api", require("./routes/api"));

// app.use("/", require("./routes/index"));

// Middleware
app.use(cors);
app.use(bodyParse.json());
app.use(express.urlencoded({ extended: false }));
// app.use(morgan("dev"));

// app.get("/mas", (req, res) => {
//   res.json({ message: "Hello World" });
// });

const Twitter = require("twitter-v2");

const client = new Twitter({
  consumer_key: process.env.TWITTER_CONSUMER_API_KEY,
  consumer_secret: process.env.TWITTER_CONSUMER_API_SECRET,
  access_token_key: process.env.TWITTER_ACCESS_TOKEN,
  access_token_secret: process.env.TWITTER_ACCESS_SECRET,
  //bearer_token: process.env.BEARER_TOKEN
});

app.get("/", async (req, res) => {
  // const user = req.query.user;
  const user = "jack";
  const recent = await client.get("tweets/search/recent", {
    query: `from:${user}`,
    expansions: ["author_id", "attachments.media_keys"],
    user: {
      fields: [
        "description",
        "name",
        "username",
        "profile_image_url",
        "verified",
      ],
    },
    media: {
      fields: [
        "duration_ms",
        "height",
        "width",
        "media_key",
        "preview_image_url",
        "public_metrics",
        "type",
        "url",
        "alt_text",
      ],
    },
    tweet: {
      fields: [
        "source",
        "id",
        "withheld",
        "created_at",
        "text",
        "entities",
        "in_reply_to_user_id",
        "public_metrics",
        "referenced_tweets",
        "author_id",
        "attachments",
      ],
    },
  });

  res.status(200).send(recent);
});

app.listen(port, () => {
  console.log(`A NodeJs API is listining on port: ${port}`);
});
