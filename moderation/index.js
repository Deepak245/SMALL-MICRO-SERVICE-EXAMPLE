const express = require("express");
const bodyParser = require("body-parser");
const axios = require("axios");

const app = express();
app.use(bodyParser.json());

// here is the place we will recieve an event from eventbus broker.the data is contained in req.body property.
app.post("/events", async (req, res) => {
  const { type, data } = req.body;

  //if type is comment Created then only we have to do the comment moderatin else we have to skip.
  // to handle that change we filtered for CommentCreated Event.
  if (type === "CommentCreated") {
    // to approve/reject we have to do inside of commentcreated.
    const status = data.content.includes("orange") ? "rejected" : "approved";
    // once comment is moderated we have to emmit a notify event to event bus broker with updated status.
    await axios.post("http://localhost:4005/events", {
      type: "CommentModerated",
      data: {
        id: data.id,
        postId: data.postId,
        status: status,
        content: data.content,
      },
    });
  }

  //we have to send the req to anther route else the request status will be hanged.
  // res.status(201).send(posts[id]);
  res.send({});
});

app.listen(4003, () => {
  console.log("Listening to Port 4003");
});
