const express = require("express");
const cors = require("cors");
const path = require("path");
const bodyParser = require("body-parser");
const SprinklerController = require("./SprinklerController");

require("log-timestamp"); // Timestamp on all log messages

const app = express();
app.disable("x-powered-by");
app.use(cors());
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, "frontend-app/build")));

const Sprinklers = new SprinklerController();
const MAX_MINUTES = 15;

app.post("/water", (req, res) => {
  try {
    const { zone, time } = req.body;
    if (time > 1000 * 60 * MAX_MINUTES) {
      throw new Error("Cannot water for longer than 15 minutes!");
    }
    Sprinklers.waterZone(zone, time);
    res.send("Successfully started watering task!");
  } catch (error) {
    console.error(error);
    res.status(500).json({ error });
  }
});

app.post("/cycle", (req, res) => {
  try {
    const { time } = req.body;
    if (time > 1000 * 60 * MAX_MINUTES) {
      throw new Error("Cannot water for longer than 15 minutes!");
    }
    Sprinklers.waterCycle(time);
    res.send("Successfully started cycle task!");
  } catch (error) {
    console.error(error);
    res.status(500).json({ error });
  }
});


app.get("/status", (req,res) => {
  const status = {
    isWatering: Sprinklers.isWatering,
    cycleInProgress: Sprinklers.cycleInProgress,
    timeRemaining: Sprinklers.timeRemaining
  };

  res.send(status);
})

app.delete("/water", (req, res) => {
  Sprinklers.stopAll();
  res.send("Successfully stopped all tasks");
});

process.on("SIGINT", () => {
  Sprinklers.destroy();
});

console.log("Started!");
app.listen(3000, () => console.log(`Listening on port 3000`)); // eslint-disable-line
