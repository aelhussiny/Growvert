import firebase from "firebase/app";
import "firebase/auth";
import 'firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyDQfWa6LBuc6BQ0JRxUTLiafXvq3L1C4EQ",
    authDomain: "hydroponics-app-f7956.firebaseapp.com",
    projectId: "hydroponics-app-f7956",
    storageBucket: "hydroponics-app-f7956.appspot.com",
    messagingSenderId: "172785109690",
    appId: "1:172785109690:web:a9fd5b3f804f0b56f25083",
    measurementId: "G-DD8QTQ8WBT",
};

const app = firebase.initializeApp(firebaseConfig);

export default app;