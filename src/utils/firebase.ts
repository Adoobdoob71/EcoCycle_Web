import { initializeApp, getApps } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyA13vOQ9K40Ic4qxD0H5ac_epCrZvDSHf8",
  authDomain: "ecocycle-3ec15.firebaseapp.com",
  databaseURL:
    "https://ecocycle-3ec15-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "ecocycle-3ec15",
  storageBucket: "ecocycle-3ec15.appspot.com",
  messagingSenderId: "1051136066970",
  appId: "1:1051136066970:web:c8a4fe2c9624f64d9de623",
  measurementId: "G-MH2VHPPS74",
};

if (getApps().length === 0) initializeApp(firebaseConfig);