const { initializeApp } = require("firebase/app");
const { getAnalytics } = require("firebase/analytics");

const firebaseConfig = {
  apiKey: "AIzaSyBI0kGKzaEW_qA9Isop8sdBhaOESz--8Xc",
  authDomain: "web-doan-44696.firebaseapp.com",
  databaseURL: "https://web-doan-44696-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "web-doan-44696",
  storageBucket: "web-doan-44696.appspot.com",
  messagingSenderId: "1059647788273",
  appId: "1:1059647788273:web:a20c45f8b97e916484c550",
  measurementId: "G-5XS5Q4Y8T7"
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);  

module.exports = { app, analytics };