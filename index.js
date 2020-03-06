const express = require("express");
const Sse = require("json-sse"); //stream maker

const app = express();
const port = 4000;

const db = {};

db.messages = [];

const parser = express.json();
app.use(parser);

const stream = new Sse();

app.get("/stream", (request, response) => {
  stream.updateInit(db.message); //new user get the history
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
