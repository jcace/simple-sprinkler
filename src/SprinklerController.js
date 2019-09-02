const RELAYS = require("./RELAYS");
const turnOnRelay = require("./turnOnRelay");

module.exports = class SprinklerController {
  constructor() {
    this.RELAYS = RELAYS;
    this.scheduledTasks = [];

    turnOnRelay(this.RELAYS, -1);
  }

  waterZone(zone, time) {
    turnOnRelay(this.RELAYS, zone);
    this.scheduledTasks.push(setTimeout(turnOnRelay, time, this.RELAYS, -1));
  }

  stopAll() {
    turnOnRelay(this.RELAYS, -1);
    this.scheduledTasks.forEach(task => clearTimeout(task));
  }

  destroy() {
    this.stopAll();
    this.RELAYS.forEach(RELAY => {
      RELAY.unexport();
    });
  }
};
