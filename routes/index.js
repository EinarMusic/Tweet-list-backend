const router = require("express").Router();

router.get("/", async (req, res) => {
  res.status(200).send({ message: "Ok api is working!" });
});

module.exports = router;
