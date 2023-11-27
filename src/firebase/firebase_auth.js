// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";;

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyD671raQrl7TWnNWVrVWZQLPxhB4DO23Xg",
    authDomain: "ecomerce-eab0d.firebaseapp.com",
    databaseURL: "https://ecomerce-eab0d-default-rtdb.firebaseio.com",
    projectId: "ecomerce-eab0d",
    storageBucket: "ecomerce-eab0d.appspot.com",
    messagingSenderId: "268947090894",
    appId: "1:268947090894:web:643469475110775a2fcf9f",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);

export const firebase_auth = getAuth(app);
