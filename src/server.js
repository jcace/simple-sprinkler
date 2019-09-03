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
  try {
    const { zone, time } = req.body;
    Sprinklers.waterZone(zone, time);
    res.send("Successfully started watering task!");
  } catch (error) {
    res.status(500).json({ error });
  }
});

app.post("/cycle", (req, res) => {
  try {
    const { time } = req.body;
    Sprinklers.waterCycle(time);
    res.send("Successfully started cycle task!");
  } catch (error) {
    res.status(500).json({ error });
  }
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
