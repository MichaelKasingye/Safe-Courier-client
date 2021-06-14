import firebase from "firebase";

const firebaseApp = firebase.initializeApp({
   
    apiKey: "AIzaSyAAsPudVmT4uAVmJ3QTaBOa9nCw9HvyBIU",
    authDomain: "code-challenge-efd04.firebaseapp.com",
    projectId: "code-challenge-efd04",
    storageBucket: "code-challenge-efd04.appspot.com",
    messagingSenderId: "86986998349",
    appId: "1:86986998349:web:8f1a916107e1d56d729204",
    measurementId: "G-62F3TKB4BC"
     
});

const db = firebaseApp.firestore();
const auth = firebase.auth();
const storage = firebase.storage();

export{db, auth, storage};