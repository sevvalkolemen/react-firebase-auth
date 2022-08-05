import { async } from "@firebase/util";
import { initializeApp } from "firebase/app";
import { getAuth, createUserWithEmailAndPassword, updateProfile, updatePassword, sendEmailVerification, onAuthStateChanged,signInWithEmailAndPassword, signOut  } from "firebase/auth";
import toast from "react-hot-toast";
import store from "./store";
import {login as loginHandle, logout as logoutHandle} from "./store/auth"

// const firebaseConfig = {
//   apiKey: process.env.REACT_APP_API_KEY,
//   authDomain: process.env.AUTH_DOMAIN,
//   projectId: process.env.PROJECT_ID,
//   storageBucket: process.env.STORAGE_BUCKET,
//   messagingSenderId: process.env.MESSAGING_SENDER_ID,
//   appId: process.env.REACT_APP_ID
// };

const firebaseConfig = {
  apiKey: "AIzaSyCAyBay-BJMCLYsN9uq_ndxSGrbUH-0w0g",
  authDomain: "arneca-auth.firebaseapp.com",
  projectId: "arneca-auth",
  storageBucket: "arneca-auth.appspot.com",
  messagingSenderId: "750540649025",
  appId: "1:750540649025:web:449bd5de59e5ae4d2accc0"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth();

export const register = async (email, password) => {
  try{
    const {user} = await createUserWithEmailAndPassword(auth, email, password)
    return user
  } catch (error) {
    toast.error(error.message)
  }
  
}

export const login = async (email,password) => {
  try {
    const {user} = await signInWithEmailAndPassword (auth, email, password)
    return user
  } catch (error) {
    toast.error(error.message)
  } 
}

export const logout = async () => {
  try{
    await signOut(auth)
    return true
  } catch (error) {
    toast.error(error.message)
  }
}

export const update = async data => {
  try{
    await updateProfile(auth.currentUser, data)
    toast.success('Profile Updated')
    return true
  } catch(error){
    toast.error(error.message)
  }
}

export const resetPassword = async password => {
  try{
    await updatePassword(auth.currentUser, password)
    toast.success('Pasword Updated')
    return true
  } catch(error){
    toast.error(error.message)
  }
}

export const emailVerificaiton = async () => {
  try{
    await sendEmailVerification(auth.currentUser)
    toast.success(`Verification mail was sent to ${auth.currentUser.email} address. Please check!`)
  } catch(error) {
    toast.error(error.message)
  }
}

onAuthStateChanged(auth, (user) => {
  if (user) {
    store.dispatch(loginHandle({
      displayName: user.displayName,
      email: user.email,
      emailVerified: user.emailVerified,
      photoURL: user.photoURL,
      uid: user.uid
    }))
  } else {
    store.dispatch(logoutHandle(user))
  }
});

export default app
