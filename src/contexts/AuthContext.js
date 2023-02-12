import React, { useContext, useState, useEffect } from "react";
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  sendPasswordResetEmail,
  updateEmail,
  updatePassword,
} from "firebase/auth";
import { auth } from "../firebase";

const AuthContext = React.createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState();
  const [loading, setLoading] = useState(true);

  function signup(email, password) {
    return createUserWithEmailAndPassword(auth, email, password);
  }

  function signin(email, password) {
    return signInWithEmailAndPassword(auth, email, password);
  }

  function signout() {
    return auth.signOut();
  }

  function resetPassword(email) {
    return sendPasswordResetEmail(auth, email);
  }

  function updatemail(email) {
    return updateEmail(auth.currentUser, email);
  }

  function updatepassword(password) {
    return updatePassword(auth.currentUser, password);
  }

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
      setLoading(false);
    });
    return unsubscribe;
  }, []);
  const value = {
    currentUser,
    signup,
    signin,
    signout,
    resetPassword,
    updatemail,
    updatepassword,
  };
  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}
