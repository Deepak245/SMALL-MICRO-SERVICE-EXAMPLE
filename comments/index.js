const express = require("express");
const bodyParser = require("body-parser");
const { randomBytes } = require("crypto");
const cors = require("cors");
const axios = require("axios");

const app = express();

app.use(bodyParser.json());
app.use(cors()); // make sure this is linked as middle ware as request hve to pass through this before going into route.

const commentsByPostId = {};

app.get("/posts/:id/comments", (req, res) => {
  res.send(commentsByPostId[req.params.id] || []);
});

app.post("/posts/:id/comments", async (req, res) => {
  const commentId = randomBytes(4).toString("hex");
  const { content } = req.body;

  const comments = commentsByPostId[req.params.id] || [];

  comments.push({ id: commentId, content: content });
  await axios.post("http://localhost:4005/events", {
    type: "CommentsCreated",
    data: {
      id: commentId,
      content: content,
      postId: req.params.id,
    },
  });
  commentsByPostId[req.params.id] = comments;
  res.status(201).send(comments);
});

app.post("/events", (req, res) => {
  console.log("Events Received", req.body.type);
  res.send({});
});

app.listen(4001, () => {
  console.log("Comments Service Listening to Service 4001");
});
