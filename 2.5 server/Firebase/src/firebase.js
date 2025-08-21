
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getDatabase } from 'firebase/database'


const firebaseConfig = {
  apiKey: "AIzaSyAinvTCStlN60-P7YnBU6W0cWHIn0FV_u0",
  authDomain: "server-requests-1cc8a.firebaseapp.com",
  projectId: "server-requests-1cc8a",
  storageBucket: "server-requests-1cc8a.firebasestorage.app",
  messagingSenderId: "79971728996",
  appId: "1:79971728996:web:61951f3377689b71cfa971",
  measurementId: "G-9JENRH9V4G",
  databaseURL: 'https://server-requests-1cc8a-default-rtdb.europe-west1.firebasedatabase.app'
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export const db = getDatabase(app)