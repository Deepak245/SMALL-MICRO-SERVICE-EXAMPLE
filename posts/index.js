const express = require("express");
const bodyParser = require("body-parser");
const { randomBytes } = require("crypto");
const cors = require("cors");
const axios = require("axios");

const app = express();
app.use(bodyParser.json());
app.use(cors()); // make sure this is linked as middle ware as request hve to pass through this before going into route.
const posts = {};

app.get("/posts", (req, res) => {
  res.send(posts);
});

app.post("/posts", async (req, res) => {
  const id = randomBytes(4).toString("hex");
  const { title } = req.body;

  posts[id] = { id, title };
  await axios.post("http://localhost:4005/events", {
    type: "PostCreated",
    data: {
      id: id,
      title: title,
    },
  });
  res.status(201).send(posts[id]);
});
//adding events  to our post
app.post("/events", (req, res) => {
  console.log("Event Received", req.body.type);

  res.send({});
});
app.listen(4000, () => {
  console.log("Listening Post Service on 4000");
});
