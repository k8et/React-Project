import { initializeApp } from "firebase/app";
import {getFirestore} from "firebase/firestore";
import {getAuth} from "firebase/auth";


const firebaseConfig = {
    apiKey: "AIzaSyDFyTKbdbY3enmfalMNe9OuUHLbuMXmJmc",
    authDomain: "my-medical-project-2fab3.firebaseapp.com",
    projectId: "my-medical-project-2fab3",
    storageBucket: "my-medical-project-2fab3.appspot.com",
    messagingSenderId: "1098528747900",
    appId: "1:1098528747900:web:ab67e65bfcebd6c07534f9"
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);
const db = getFirestore(firebaseApp);
const auth = getAuth(firebaseApp);

export { db, auth };
export const app = initializeApp(firebaseConfig);
