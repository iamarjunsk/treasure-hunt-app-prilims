import { initializeApp } from "firebase/app";
import {getFirestore} from '@firebase/firestore'
const firebaseConfig = {
    apiKey: "AIzaSyCYO7u6zrzrQjmA-Q5TEqzbyt9rylkvmCY",
    authDomain: "treasure-hunt-ff2ad.firebaseapp.com",
    databaseURL: "https://treasure-hunt-ff2ad-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "treasure-hunt-ff2ad",
    storageBucket: "treasure-hunt-ff2ad.appspot.com",
    messagingSenderId: "906194564857",
    appId: "1:906194564857:web:dfd1555bd5be67e86c1428"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);

