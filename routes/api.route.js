const router = require("express").Router();
const Twitter = require("twitter-v2");

const client = new Twitter({
  consumer_key: process.env.TWITTER_CONSUMER_API_KEY,
  consumer_secret: process.env.TWITTER_CONSUMER_API_SECRET,
  access_token_key: process.env.TWITTER_ACCESS_TOKEN,
  access_token_secret: process.env.TWITTER_ACCESS_SECRET
  //bearer_token: process.env.BEARER_TOKEN
});

// search recent tweet by user or users
router.get("/tweet", async (req, res) => {
  const list = req.query.myList;
  const recent = await client.get("tweets/search/recent", {
    query: `from:${list}`,
    expansions: ["author_id", "attachments.media_keys"],
    user: {
      fields: [
        "description",
        "name",
        "username",
        "profile_image_url",
        "verified"
      ]
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
        "alt_text"
      ]
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
        "attachments"
      ]
    }
  });

  res.status(200).send(recent);
});

router.get("/specific", async (req, res) => {
  const id = req.query.id;
  const recent = await client.get("tweets", {
    ids: `${id}`,
    expansions: ["author_id", "attachments.media_keys"],
    user: {
      fields: [
        "description",
        "name",
        "username",
        "profile_image_url",
        "verified"
      ]
    },
    media: {
      fields: [
        "duration_ms",
        "height",
        "media_key",
        "preview_image_url",
        "public_metrics",
        "type",
        "url",
        "alt_text"
      ]
    },
    tweet: {
      fields: [
        "id",
        "withheld",
        "created_at",
        "text",
        "entities",
        "in_reply_to_user_id",
        "public_metrics",
        "referenced_tweets",
        "author_id",
        "attachments"
      ]
    }
  });

  res.status(200).send(recent);
});

router.get("/", async (req, res) => {
  res.status(200).send({ message: "Ok api is working!" });
});

module.exports = router;
