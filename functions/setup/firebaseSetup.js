//setup firebase
const functions = require('firebase-functions');
const admin = require('firebase-admin');
const serviceAccount = require('../config/my-portfolio-2020-eb31a-service-account.json');

//initialize project app
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: 'https://my-portfolio-2020-eb31a.firebaseio.com',
});

module.exports.functions = functions;
