const { Gpio } = require("onoff");

const RELAY1 = new Gpio(22, "out");
const RELAY2 = new Gpio(23, "out");
const RELAY3 = new Gpio(27, "out");
const RELAY_UNUSED = new Gpio(17, "out");
RELAY1.activeLow(true);
RELAY2.activeLow(true);
RELAY3.activeLow(true);
RELAY_UNUSED.activeLow(true);

const RELAYS = [RELAY1, RELAY2, RELAY3, RELAY_UNUSED];

module.exports = RELAYS;
