// firebase.js
const admin = require('firebase-admin');
const serviceAccount = require('./messaging0service.json'); 

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

module.exports = admin;
