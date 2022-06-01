// Import the functions you need from the SDKs you need
  import { initializeApp } from "https://www.gstatic.com/firebasejs/9.8.2/firebase-app.js";
  import { getAnalytics } from "https://www.gstatic.com/firebasejs/9.8.2/firebase-analytics.js";
  // TODO: Add SDKs for Firebase products that you want to use
  // https://firebase.google.com/docs/web/setup#available-libraries

  // Your web app's Firebase configuration
  // For Firebase JS SDK v7.20.0 and later, measurementId is optional
  const firebaseConfig = {
    apiKey: "AIzaSyDIMG7dOEXrE2HACNZ6uT0CEicMzZyGRFo",
    authDomain: "votationapp-1323f.firebaseapp.com",
    projectId: "votationapp-1323f",
    storageBucket: "votationapp-1323f.appspot.com",
    messagingSenderId: "933375892326",
    appId: "1:933375892326:web:3090cd055144b00e7506a7",
    measurementId: "G-WSHHR1YM6N"
  };

  // Initialize Firebase
  const app = initializeApp(firebaseConfig);
  const analytics = getAnalytics(app);