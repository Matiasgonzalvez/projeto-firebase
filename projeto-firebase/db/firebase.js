const { initializeApp } = require('firebase/app');
const { getFirestore } = require('firebase/firestore');

const firebaseConfig = {
    apiKey: "AIzaSyAv0IlH1P6jbWh-ozYcbUs9LJQgV7-o3NE",
    authDomain: "projeto-firebase-10802.firebaseapp.com",
    projectId: "projeto-firebase-10802",
    storageBucket: "projeto-firebase-10802.appspot.com",
    messagingSenderId: "156808920492",
    appId: "1:156808920492:web:4a01b0db529c8d37c30e09"
};

const app = initializeApp(firebaseConfig);

const db = getFirestore(app);

module.exports =  db ;