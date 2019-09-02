const turnOnRelay = require("./turnOnRelay");

class Cycle {
  constructor(RELAYS) {
    this.currentState = "off";
    this.cycleTask;
    this.RELAYS = RELAYS;
  }

  startCycle = minutesPerSprinkler => {
    if (this.currentState !== "off") {
      throw new Error("Cannot schedule cycle while another one is running!");
    }

    this.cycleTask = setInterval(this.stepCycle, minutesPerSprinkler * 60000);
  };

  clearCycle = () => {
    clearInterval(this.cycleTask); // Stop blink intervals
    turnOnRelay(RELAYS, -1);
    this.currentState = "off";
  };

  stepCycle = () => {
    switch (this.currentState) {
      case "off":
        turnOnRelay(RELAYS, 0);
        this.currentState = "1on";
        break;
      case "1on":
        turnOnRelay(RELAYS, 1);
        this.currentState = "2on";
        break;
      case "2on":
        turnOnRelay(RELAYS, 2);
        this.currentState = "3on";
        break;
      case "3on":
        turnOnRelay(RELAYS, -1);
        this.currentState = "off";
        clearInterval(this.cycleTask); // Stop blink intervals
        break;
    }
  };
}
