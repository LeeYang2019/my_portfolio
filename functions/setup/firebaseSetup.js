//setup firebase
const functions = require('firebase-functions');
const admin = require('firebase-admin');
const serviceAccount = require('../config/my-portfolio-2020-eb31a-service-account.json');

//initialize project app
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: 'https://my-portfolio-2020-eb31a.firebaseio.com',
});

//access resume folder in storage
function downloadResume() {
  const storage = admin.storage();
  const pathReference = storage.ref('resume/');
  return pathReference;
}

module.exports.functions = functions;
module.exports.downloadResume = downloadResume;
