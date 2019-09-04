const RELAYS = require("./RELAYS");
const turnOnRelay = require("./turnOnRelay");

module.exports = class SprinklerController {
  constructor() {
    this.RELAYS = RELAYS;
    this.scheduledTasks = [];
    this.cycleInProgress = false;

    turnOnRelay(this.RELAYS, -1); // Initialize all relays OFF
  }

  waterZone(zone, time) {
    if (this.cycleInProgress) {
      throw new Error(
        "A cycle is already in progress. Please clear all tasks first!"
      );
    }
    this.stopAll(); // Ensure any timeouts / stops are cleared first
    console.log(`Begin watering zone ${zone} for ${time}ms`);
    turnOnRelay(this.RELAYS, zone);
    this.scheduledTasks.push(setTimeout(this.stopAll.bind(this), time));
  }

  waterCycle(timePerZone) {
    if (this.cycleInProgress) {
      throw new Error(
        "A cycle is already in progress. Please clear all tasks first!"
      );
    }
    console.log(`Begin watering a cycle of all zones for ${time} each`);
    this.cycleInProgress = true;

    turnOnRelay(this.RELAYS, 0);

    this.scheduledTasks.push(
      setTimeout(turnOnRelay, timePerZone, this.RELAYS, 1)
    );
    this.scheduledTasks.push(
      setTimeout(turnOnRelay, 2 * timePerZone, this.RELAYS, 2)
    );
    this.scheduledTasks.push(
      setTimeout(this.stopAll.bind(this), 3 * timePerZone)
    );
  }

  stopAll() {
    console.log(`Stopping all watering tasks`);
    turnOnRelay(this.RELAYS, -1);
    this.cycleInProgress = false;
    this.scheduledTasks.forEach(task => clearTimeout(task));
    this.scheduledTasks = [];
  }

  destroy() {
    this.stopAll();
    this.RELAYS.forEach(RELAY => {
      RELAY.unexport();
    });
  }
};
