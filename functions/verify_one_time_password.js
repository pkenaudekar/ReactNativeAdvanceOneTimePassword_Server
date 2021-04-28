/* eslint-disable linebreak-style */
/* eslint-disable no-trailing-spaces */
/* eslint-disable linebreak-style */
/* eslint-disable space-before-function-paren */
/* eslint-disable linebreak-style */
/* eslint-disable quotes */
/* eslint-disable object-curly-spacing */
/* eslint-disable linebreak-style */
/* eslint-disable max-len */
/* eslint-disable linebreak-style */
/* eslint-disable indent */
const admin = require('firebase-admin');

module.exports = function (req, res) {
  if (!req.body.phone || !req.body.code) {
    return res.status(422).send({ error: 'Phone and code must be provided' });
  }

  // Replacing all non number characters with an empty string
  const phone = '+' + String(req.body.phone).replace(/[^\d]/g, '');
  const code = parseInt(req.body.code);

  // Fetching user using the phone number
  admin
    .auth()
    .getUser(phone)
    .then(() => {
      const ref = admin.database().ref('users/' + phone);
      ref.on('value', (snapshot) => {
        ref.off(); // After getting value one time stop listening
        const user = snapshot.val();

        if (user.code !== code || !user.codeValid) {
          return res.send({ error: 'Code not valid' });
        }

        ref.update({ codeValid: false });

        // Generate and send JWT to the users device
        admin
          .auth()
          .createCustomToken(phone)
          .then((token) => {
            // Send token back to client
            res.status(200).send({ token });
          })
          .catch((err) => {
            res
              .status(422)
              .send({ error: 'Error creating custom token: ', err });
          });
      });
    })
    .catch((err) => {
      res.status(422).send({ error: 'No such user in Firebase--> ', err });
    });
};
