const express = require("express");
const cors = require("cors");
const path = require("path");
const bodyParser = require("body-parser");
const SprinklerController = require("./SprinklerController");

const app = express();
app.disable("x-powered-by");
app.use(cors());
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, "frontend")));

const Sprinklers = new SprinklerController();

app.post("/water", (req, res) => {
  console.log(req.body);
  const { zone, time } = req.body;
  Sprinklers.waterZone(zone, time);
  res.send("Successfully scheduled watering task!");
});

app.delete("/water", (req, res) => {
  Sprinklers.stopAll();
  res.send("Successfully stopped all tasks");
});

process.on("SIGINT", () => {
  Sprinklers.destroy();
});

console.log("Started!");
app.listen(3000, () => console.log(`Listening on port 3000`)); // eslint-disable-line
