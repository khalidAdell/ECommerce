import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// Your web app's Firebase configuration
export const firebaseConfig = {
  apiKey: "AIzaSyCkmn-AMwjX1elFsRVWSsIG91FPn9rgac8",
  authDomain: "elol-1997d.firebaseapp.com",
  projectId: "elol-1997d",
  storageBucket: "elol-1997d.appspot.com",
  messagingSenderId: "684453664287",
  appId: "1:684453664287:web:b7748e300a0a27d861e72a",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);

export default app;
