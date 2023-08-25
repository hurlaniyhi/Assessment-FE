import { initializeApp } from "firebase/app";
import {getAuth} from 'firebase/auth'

// App's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCH1Oefoou4IOFv_mWv1gLcxo7Gi7fVZEE",
  authDomain: "assessment-quiz-52b62.firebaseapp.com",
  projectId: "assessment-quiz-52b62",
  storageBucket: "assessment-quiz-52b62.appspot.com",
  messagingSenderId: "392457613198",
  appId: "1:392457613198:web:55915968e7d7b7faf33edf"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app)