
import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
import { getStorage } from "firebase/storage";
const firebaseConfig = {
  apiKey: "AIzaSyAMullgZiRpBgnl8x1hTPovs0HHv3hYhAQ",
  authDomain: "moot-music-lab1.firebaseapp.com",
  projectId: "moot-music-lab1",
  storageBucket: "moot-music-lab1.appspot.com",
  messagingSenderId: "283641164809",
  appId: "1:283641164809:web:aaed8cd0bdf28f0c4034d8",
  measurementId: "G-KRZ8CLSN1F"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const storage =getStorage(app)
// const analytics = getAnalytics(app);