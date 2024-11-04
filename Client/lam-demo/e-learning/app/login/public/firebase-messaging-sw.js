// Import Firebase scripts
importScripts('https://www.gstatic.com/firebasejs/9.0.0/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/9.0.0/firebase-messaging-compat.js');

// Cấu hình Firebase
firebase.initializeApp({
  apiKey: "AIzaSyBI0kGKzaEW_qA9Isop8sdBhaOESz--8Xc",
  authDomain: "web-doan-44696.firebaseapp.com",
  projectId: "web-doan-44696",
  storageBucket: "web-doan-44696.appspot.com",
  messagingSenderId: "1059647788273",
  appId: "1:1059647788273:web:a20c45f8b97e916484c550",
});

const messaging = firebase.messaging();

// Xử lý thông báo khi ứng dụng đang ở nền
messaging.onBackgroundMessage((payload) => {
  console.log('[firebase-messaging-sw.js] Received background message ', payload);
  const notificationTitle = payload.notification.title;
  const notificationOptions = {
    body: payload.notification.body,
    icon: './img/logo.png',
  };

  self.registration.showNotification(notificationTitle, notificationOptions);
});
