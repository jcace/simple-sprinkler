const ON = 0;
const OFF = 1;

module.exports = (RELAYS, relayToTurnOn) => {
  if (relayToTurnOn === -1) {
    RELAYS.forEach(RELAY => {
      RELAY.writeSync(OFF);
    });
  } else {
    for (let i = 0; i < RELAYS.length; i++) {
      if (i === relayToTurnOn) {
        RELAYS[i].writeSync(ON); // turn ON
      } else {
        RELAYS[i].writeSync(OFF);
      }
    }
  }
};
