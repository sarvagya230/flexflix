import { initializeApp } from "firebase/app";
import {Firestore} from 'firebase/firestore'
import {getAuth} from 'firebase/auth'
import { getFirestore } from "firebase/firestore";
const firebaseConfig = {
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: process.env.REACT_APP_AUTH,
  projectId: process.env.REACT_APP_PROJECTID,
  storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_APP_ID
};
initializeApp(firebaseConfig);
const apps=getFirestore()
export{apps}