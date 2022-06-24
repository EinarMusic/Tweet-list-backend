const express = require("express");
// const morgan = require("morgan");
const cors = require("cors");
const bodyParse = require("body-parser");
require("dotenv/config");

const app = express();
const port = process.env.PORT || 3030;

// import Routes
app.use("/api", require("./routes/api"));

app.use("/", require("./routes/index"));

// Middleware
app.use(cors);
app.use(bodyParse.json());
app.use(express.urlencoded({ extended: false }));
// app.use(morgan("dev"));

app.get("/mas", (req, res) => {
  res.json({ message: "Hello World" });
});

app.listen(port, () => {
  console.log(`A NodeJs API is listining on port: ${port}`);
});
