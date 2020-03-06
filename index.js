const express = require("express");
const Sse = require("json-sse"); //stream maker
const cors = require("cors");

const app = express();
const port = 4000;

const db = {};

db.messages = [];

app.use(cors());

const parser = express.json();
app.use(parser);

const stream = new Sse();

app.get("/stream", (request, response) => {
  stream.updateInit(db.messages); //new user get the history, every user gets it again
  stream.init(request, response);
});

app.post("/message", (request, response) => {
  const { text } = request.body;

  db.messages.push(text);

  response.send(text);
  stream.send(text);

  console.log("db test:", db);
});

app.listen(port, () => console.log("listening on ", port));
