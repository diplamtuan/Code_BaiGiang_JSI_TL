import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "https://www.gstatic.com/firebasejs/10.8.0/firebase-auth.js";
const firebaseConfig = {
  apiKey: "AIzaSyBHJnMpNNSZaCvAdPF0Xoe-JEj85Dw43BY",
  authDomain: "fir-authenjsi.firebaseapp.com",
  projectId: "fir-authenjsi",
  storageBucket: "fir-authenjsi.appspot.com",
  messagingSenderId: "236900959898",
  appId: "1:236900959898:web:9176136b6cedf15b45c123",
  measurementId: "G-E3ZJB01V2L",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth();

export const dangky = async (auth, email, password) => {
  let isSuccess;
  let infoMessage;
  try {
    const user = await createUserWithEmailAndPassword(auth, email, password);
    isSuccess = true;
  } catch (err) {
    isSuccess = false;
    infoMessage = err.code;
  }
  return {
    isSuccess,
    infoMessage,
  };
};

export const dangnhap = async (auth, email, password) => {
  let isSuccess;
  let infoMessage;
  try {
    const user = await signInWithEmailAndPassword(auth, email, password);
    isSuccess = true;
  } catch (err) {
    isSuccess = false;
    infoMessage = err.code;
  }
  return {
    isSuccess,
    infoMessage,
  };
};
