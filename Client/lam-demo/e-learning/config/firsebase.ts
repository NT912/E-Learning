import { initializeApp } from "firebase/app";
import { getMessaging, getToken, onMessage  } from "firebase/messaging";

const firebaseConfig = {
  apiKey: "AIzaSyBI0kGKzaEW_qA9Isop8sdBhaOESz--8Xc",
  authDomain: "web-doan-44696.firebaseapp.com",
  projectId: "web-doan-44696",
  storageBucket: "web-doan-44696.appspot.com",
  messagingSenderId: "1059647788273",
  appId: "1:1059647788273:web:a20c45f8b97e916484c550",
};

const app = initializeApp(firebaseConfig);
const messaging = getMessaging(app);

export { messaging, getToken, onMessage };
