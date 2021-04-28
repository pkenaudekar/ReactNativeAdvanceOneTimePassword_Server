/* eslint-disable eol-last */
/* eslint-disable max-len */
/* eslint-disable indent */
/* eslint-disable object-curly-spacing */
/* eslint-disable quotes */
const admin = require('firebase-admin');
const functions = require('firebase-functions');
const createUser = require('./create_user');
const serviceAccount = require('./service_account.json');
const requestOTP = require('./request_one_time_password');
const verifyOTP = require('./verify_one_time_password');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: 'https://one-time-password-58109-default-rtdb.firebaseio.com',
});

exports.createUser = functions.https.onRequest(createUser);
exports.requestOTP = functions.https.onRequest(requestOTP);
exports.verifyOTP = functions.https.onRequest(verifyOTP);
