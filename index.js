const express = require("express");
// const Sse = require("json-sse"); //stream maker
const cors = require("cors");
const db = require("./db");
const messageRouter = require("./message/router");
const channelRouter = require("./channel/router");
const stream = require("./stream");

const app = express();
const port = process.env.PORT || 4000;

app.use(cors());

const parser = express.json();
app.use(parser);

app.get("/stream", (request, response) => {
  const action = {
    type: "ALL_MESSAGES",
    payload: db.messages
  };

  stream.updateInit(action); //new user get the history, every user gets it again
  stream.init(request, response);
});

app.use(messageRouter);
app.use(channelRouter);

app.listen(port, () => console.log("listening on ", port));
