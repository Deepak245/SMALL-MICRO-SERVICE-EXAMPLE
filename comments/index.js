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
  // status of pending is added to make sure of implementing comment moderation service.
  comments.push({ id: commentId, content: content, status: "pending" });

  commentsByPostId[req.params.id] = comments;
  // here we are pushing our event to event bus. so added a status of pending to data object.
  //this will get linked to index file of Query which is a query service.
  await axios.post("http://localhost:4005/events", {
    type: "CommentCreated",
    data: {
      id: commentId,
      content: content,
      postId: req.params.id,
      status: "pending",
    },
  });

  res.status(201).send(comments);
});

app.post("/events", async (req, res) => {
  console.log("Events Received", req.body.type);

  // this is to handle incoming moderated comment from moderation service.
  if (req.body.type === "CommentModerated") {
    const { postId, id, status, content } = req.body.data;
    // here we are extracting comments associated to the postid using id of the post.
    const comments = commentsByPostId[postId];
    //then iterate to getrequired comment
    const comment = comments.find((comment) => {
      return comment.id === id;
    });
    // no need to insert the comment back to commentbypostId array as the object is same object in memory and same object in array so to it we used find.

    comment.status = status;
    // now again we have to emit an event that comment update to event broker bus and this broker has to send the even to Query file.
    await axios.post("http://localhost:4005/events", {
      type: "CommentUpdated",
      data: {
        id,
        status,
        postId,
        content,
      },
    });
  }

  res.send({});
});

app.listen(4001, () => {
  console.log("Comments Service Listening to Service 4001");
});
