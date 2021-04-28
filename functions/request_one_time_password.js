/* eslint-disable linebreak-style */
/* eslint-disable new-cap */
/* eslint-disable linebreak-style */
/* eslint-disable brace-style */
/* eslint-disable no-trailing-spaces */
/* eslint-disable block-spacing */
/* eslint-disable padded-blocks */
/* eslint-disable space-before-function-paren */
/* eslint-disable linebreak-style */
/* eslint-disable eol-last */
/* eslint-disable max-len */
/* eslint-disable indent */
/* eslint-disable object-curly-spacing */
/* eslint-disable quotes */
const admin = require('firebase-admin');
const twilio = require('./twilio');
const keys = require('./config/keys');

module.exports = function (req, res) {
  const senderNumber = keys.senderNumber; // Your Sending Phone Number from www.twilio.com/console

  // Check to see if a number is provided
  if (!req.body.phone) {
    return res.status(422).send({ error: 'You must provide a phone number' });
  }

  // Replacing all non number characters with an empty string
  const phone = '+' + String(req.body.phone).replace(/[^\d]/g, '');

  // Fetching user using the phone number
  admin
    .auth()
    .getUser(phone)
    .then((userRecord) => {
      const code = Math.floor(Math.random() * 8999 + 1000);

      twilio.messages
        .create(
          {
            body: 'Your OTP code is: ' + code,
            from: senderNumber, // From a valid Twilio number
            to: phone, // Text this number
          },
          (err) => {
            if (err) {
              return res.status(422).send({ err: 'Twilio Error--> ' + err });
            }

            // Generate and save code to Firebase
            admin
              .database()
              .ref('users/' + phone)
              .update({ code: code, codeValid: true }, () => {
                res.status(200).send({ userRecord, success: true });
              });
          }
        )
        .catch((err) => {
          return res.status(422).send({ err: 'Twilio Error--> ' + err });
        });
    })
    .catch((err) => {
      res.status(422).send({ error: 'No such user in Firebase--> ', err });
    });
};
