const express = require("express");
const app = express();

const port = process.env.port || 5000;

app.get("/", (req, res) => {
  res.send("up and running");
});
app.listen(port);
