const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const axios = require("axios");

const app = express();
app.use(bodyParser.json());
app.use(cors());

const posts = {};

// this is a helper function
handleEvent = (type, data) => {
  if (type === "PostCreated") {
    const { id, title } = data;
    posts[id] = { id, title, comments: [] };
  }
  if (type === "CommentCreated") {
    //here we are adding status  to comments created event.
    const { id, content, postId, status } = data;

    const post = posts[postId];
    post.comments.push({ id, content, status });
  }
  // to handle comment UpdatedEvent.
  if (type === "CommentUpdated") {
    const { id, content, postId, status } = data;

    // here we should find the post for which we have to update the comment and update the status to reject or approved. so verysimilar
    // code to that of comment updation in events moderation service.
    const post = posts[postId];
    const comment = post.comments.find((comment) => {
      return comment.id === id;
    });

    comment.status = status;
    // here along with statuswe hve to update  conent of the post based on status of comment weather its approved/rejected.
    comment.content = content;
    // no need to add again this updated comment to array as we are directly modifing the data in the memory related to the post.
  }
};
app.get("/posts", (req, res) => {
  res.send(posts);
});

app.post("/events", (req, res) => {
  const { type, data } = req.body;
  handleEvent(type, data);
  // console.log(posts);
  res.send({});
});

app.listen(4002, async () => {
  console.log("listening to port 4002");
  // once our event query service comes online and listening to port 4002, it is probably be the right time to make a
  // axios request and get all the events stored in the array. up to that point in time.
  try {
    const res = await axios.get("http://localhost:4005/events");
    for (let event of res.data) {
      console.log("Processing Event", event.type);
      handleEvent(event.type, event.data);
    }
  } catch (error) {
    console.log(error.message);
  }
});
