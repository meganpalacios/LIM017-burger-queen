// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore, query, collection, where, onSnapshot } from 'firebase/firestore';

// import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBIitZTP56EFI4XfTgT--6pPnaRJl3sWl8",
  authDomain: "burgerqueen-2a96a.firebaseapp.com",
  projectId: "burgerqueen-2a96a",
  storageBucket: "burgerqueen-2a96a.appspot.com",
  messagingSenderId: "1070108071510",
  appId: "1:1070108071510:web:d87966708b6406bcf98df7"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);

// export const provider = new GoogleAuthProvider();
// export const logInGoogle = () => signInWithPopup(auth, provider);

export const db = getFirestore(app);

export const getAddedToCart = (callback) => {
  const dataSort = query(collection(db, 'menu-items'), where('Count', '!=', 0));
  return onSnapshot(dataSort, callback);
};
