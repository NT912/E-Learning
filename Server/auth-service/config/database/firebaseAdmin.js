// firebase.js
const admin = require('firebase-admin');
const serviceAccount = require('./messagingservice.json'); 

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

module.exports = admin;
