const express = require("express");
const Sse = require("json-sse"); //stream maker
const cors = require("cors");

const app = express();
const port = process.env.PORT || 4000;

const db = {};

db.messages = [];

app.use(cors());

const parser = express.json();
app.use(parser);

const stream = new Sse();

app.get("/stream", (request, response) => {
  const action = {
    type: "ALL_MESSAGES",
    payload: db.messages
  };

  stream.updateInit(action); //new user get the history, every user gets it again
  stream.init(request, response);
});

app.post("/message", (request, response) => {
  const { text } = request.body;

  db.messages.push(text);

  response.send(text);

  const action = {
    type: "NEW_MESSAGE",
    payload: text
  };

  stream.send(action);

  console.log("db test:", db);
});

app.listen(port, () => console.log("listening on ", port));
