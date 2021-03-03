const carriers = require('../lib/carriers.js');
const providers = require('../lib/providers.js');
const text = require('../lib/text');

// App helper functions.
function stripPhone(phone) {
  return (`${phone}`).replace(/\D/g, '');
}

function textRequestHandler(message, number, carrier, region) {
  if (!number || !message) {
    console.log({ success: false, message: 'Number and message parameters are required.' });
    return;
  }

  let carrierKey = null;
  if (carrier) {
    carrierKey = carrier.toLowerCase();
    if (carriers[carrierKey] == null) {
      console.log({
        success: false,
        message: `Carrier ${carrier} not supported!`,
      });
      return;
    }
  }
  if (message.indexOf(':') > -1) {
    // Handle problem with vtext where message would not get sent properly if it
    // contains a colon.
    message = ` ${message}`;
  }

  text.send(number, message, carrierKey, region, (err) => {
      console.log({ success: true });
  });
}
module.exports = {
  send: textRequestHandler
};