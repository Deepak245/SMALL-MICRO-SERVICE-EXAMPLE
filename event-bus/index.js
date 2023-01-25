const express = require("express");
const bodyParser = require("body-parser");
const axios = require("axios");

const app = express();
app.use(bodyParser.json());

const events = []; // this is to store all incomeing events.
app.post("/events", (req, res) => {
  const event = req.body; //what ever comes over here is request body. of event we take what ever data it is and send it to different requests.
  //here we have to notify an event to moderation service .i.e event have to get notified to moderation service.\

  events.push(event); // most old will be end and most recent will be at top.
  console.log(event);
  axios.post("http://localhost:4000/events", event).catch((err) => {
    console.log(err.message);
  });
  axios.post("http://localhost:4001/events", event).catch((err) => {
    console.log(err.message);
  });
  axios.post("http://localhost:4002/events", event).catch((err) => {
    console.log(err.message);
  });
  axios.post("http://localhost:4003/events", event).catch((err) => {
    console.log(err.message);
  });

  res.send({ status: "OK" });
});

//if any one makes request to this end point itwill give out all the events in the bus.
app.get("/events", (req, res) => {
  res.send(events);
});
app.listen(4005, () => {
  console.log("Listening to 4005");
});
