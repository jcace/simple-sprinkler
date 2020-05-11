const ON = 0;
const OFF = 1;

/**
 * Turns on the relay at the index provided. This function ensures that only one relay is on at a time.
 * If -1 is passed in as the relay to turn on, all relays will be turned off instead.
 */
module.exports = (RELAYS, relayToTurnOn) => {
  const num_relayToTurnOn = Number(relayToTurnOn);

  if (num_relayToTurnOn === -1) {
    RELAYS.forEach(RELAY => {
      RELAY.writeSync(OFF);
    });
  } else {
    for (let i = 0; i < RELAYS.length; i++) {
      if (i === num_relayToTurnOn) {
        RELAYS[i].writeSync(ON);
      } else {
        RELAYS[i].writeSync(OFF);
      }
    }
  }
};
