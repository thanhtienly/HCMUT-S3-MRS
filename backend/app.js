require("dotenv").config();
const express = require("express");

const PORT = process.env.PORT;

const app = express();

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`);
});
