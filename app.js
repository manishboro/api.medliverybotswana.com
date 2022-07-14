const express = require("express");
const cors = require("cors");

const app = express();

// To parse request body and accept cross origin requests
app.use(express.json(), cors());

app.get("/", (req, res) => res.send("<h1>Welcome to Medlivery</h1>"));

module.exports = app;