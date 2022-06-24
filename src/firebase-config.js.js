// v9 compat packages are API compatible with v8 code
import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyDnbTQBq7KMMKoWJE53vAmMl_2es1TBxSI",
    authDomain: "ds-weather-app.firebaseapp.com",
    databaseURL: "https://ds-weather-app-default-rtdb.europe-west1.firebasedatabase.app",
    projectId: "ds-weather-app",
    storageBucket: "ds-weather-app.appspot.com",
    messagingSenderId: "295833201944",
    appId: "1:295833201944:web:d21eabcfc8d2e24851826d"
};

const firebaseApp = firebase.initializeApp(firebaseConfig);
export default firebaseApp.firestore()