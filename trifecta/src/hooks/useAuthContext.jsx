// authContext.jsx
import { createContext, useContext, useState, useEffect } from "react";
import {
  signInWithEmailAndPassword,
  sendPasswordResetEmail,
  signOut,
  onAuthStateChanged,
} from 'firebase/auth';
import { auth } from '../server/FirebaseClient';

const AuthContext = createContext();

export function UserAuth() {
  return useContext(AuthContext);
}

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState({});
  const [userEmail, setUserEmail] = useState('');
  const [userUID, setUserUID] = useState('');
  const [userCompany, setUserCompany] = useState('');

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(
      auth,
      (currentUser) => {
        setUser(currentUser);
        console.log('Current user data: ', currentUser);
        if (currentUser) {
         const userEmail = currentUser.email;
         const userUID = currentUser.uid;
         const userCompany = currentUser.displayName;
          setUserEmail(userEmail || '');
          setUserUID(userUID || '');
          setUserCompany(userCompany || '');
          console.log("User email:", userEmail);
          console.log("User UID:", userUID);
          console.log("User Company:", userCompany);
        } else {
          console.log("No user authenticated");
        };
      },
    );

    return () => {
      unsubscribe();
    };
  }, []);

  function logIn(email, password) {
    return signInWithEmailAndPassword(
      auth,
      email,
      password,
    );
  }
  async function resetPassword(email) {
    try {
      await sendPasswordResetEmail(auth, email);
    } catch (error) {
      console.log(error);
    }
  }

  function logOut() {
    return signOut(auth);
  }

  const contextValue = {
    user,
    logIn,
    resetPassword,
    logOut,
    userEmail,
    userUID,
    userCompany
  };

  return (
    <AuthContext.Provider value={contextValue}>
      {children}
    </AuthContext.Provider>
  );
};
