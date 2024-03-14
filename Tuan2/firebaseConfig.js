import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "https://www.gstatic.com/firebasejs/10.8.0/firebase-auth.js";
const firebaseConfig = {
  apiKey: "AIzaSyCGPMHYXP26MUOxsl5sJTdwR2gaIymJ6q4",
  authDomain: "tuan2jsi-52524.firebaseapp.com",
  projectId: "tuan2jsi-52524",
  storageBucket: "tuan2jsi-52524.appspot.com",
  messagingSenderId: "710484892198",
  appId: "1:710484892198:web:6875d39636fb2be0bde4e7",
  measurementId: "G-VELJM3ZK3V",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth();

export const dangky = async (auth, email, pass) => {
  let isSuccess;
  let infoMessage;
  try {
    const user = await createUserWithEmailAndPassword(auth, email, pass);
    isSuccess = true;
  } catch (error) {
    isSuccess = false;
    infoMessage = error.code;
  }

  return {
    isSuccess,
    infoMessage,
  };
};

export const dangnhap = async (auth, email, pass) => {
  let isSuccess;
  let infoMessage;
  try {
    const user = await signInWithEmailAndPassword(auth, email, pass);
    isSuccess = true;
  } catch (error) {
    isSuccess = false;
    infoMessage = error.code;
  }
  return {
    isSuccess,
    infoMessage,
  };
};
