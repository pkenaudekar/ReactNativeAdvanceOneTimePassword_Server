/* eslint-disable linebreak-style */
/* eslint-disable new-cap */
/* eslint-disable linebreak-style */
/* eslint-disable max-len */
/* eslint-disable linebreak-style */
/* eslint-disable eol-last */
/* eslint-disable linebreak-style */
/* eslint-disable quotes */
const twilio = require('twilio');
const keys = require('./config/keys');

// Pass your Twillio Account Sid and Auth Token from your Twillio account
// Your Account SID from www.twilio.com/console
// Your Auth Token from www.twilio.com/console
module.exports = new twilio.Twilio(keys.accountSid, keys.authToken, {
  lazyLoading: true,
});
