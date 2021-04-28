/* eslint-disable linebreak-style */
/* eslint-disable eol-last */
/* eslint-disable linebreak-style */
/* eslint-disable no-trailing-spaces */
/* eslint-disable object-curly-spacing */
/* eslint-disable key-spacing */
/* eslint-disable space-before-blocks */
/* eslint-disable linebreak-style */
/* eslint-disable quotes */
/* eslint-disable linebreak-style */
/* eslint-disable indent */
/* eslint-disable space-before-function-paren */
/* eslint-disable linebreak-style */
// eslint-disable-next-line linebreak-style
const admin = require('firebase-admin');

module.exports = function (req, res) {
  // Verify the user provided a phone
  if (!req.body.phone) {
    return res.status(422).send({ error: 'Bad Input' });
  }

  // Format the phone number to remove dashes and parens
  const phone = '+' + String(req.body.phone).replace(/[^\d]/g, '');

  // Create a new user account using that phone number
  admin
    .auth()
    .createUser({ uid: phone })
    .then((user) => res.send(user))
    .catch((err) => res.status(422).send({ error: err.message }));

  // Respond to the user request, saying the account was made
};
