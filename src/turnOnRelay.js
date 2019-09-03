const ON = 0;
const OFF = 1;

/**
 * Turns on the relay at the index provided. This function ensures that only one relay is on at a time.
 * If -1 is passed in as the relay to turn on, all relays will be turned off instead.
 */
module.exports = (RELAYS, relayToTurnOn) => {
  if (relayToTurnOn === -1) {
    RELAYS.forEach(RELAY => {
      RELAY.writeSync(OFF);
    });
  } else {
    for (let i = 0; i < RELAYS.length; i++) {
      if (i === relayToTurnOn) {
        RELAYS[i].writeSync(ON);
      } else {
        RELAYS[i].writeSync(OFF);
      }
    }
  }
};
