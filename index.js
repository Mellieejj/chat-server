const express = require("express");

const app = express();
const port = 4000;

const db = {};

db.messages = [];
const parser = express.json();

app.use(parser);

app.post("/message", (request, response) => {
  const { text } = request.body;

  db.messages.push(text);

  response.send(text);
  console.log("db test:", db);
});

app.listen(port, () => console.log("listening on ", port));
