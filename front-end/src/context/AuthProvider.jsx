/* eslint-disable react/prop-types */
import { createContext, useContext } from "react";
import { useState, useEffect } from "react";
import app from "../firebase/firebase.config";
import {
  GoogleAuthProvider,
  GithubAuthProvider,
  createUserWithEmailAndPassword,
  getAuth,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
} from "firebase/auth";
import { DataContext } from "./DataProvider";

export const AuthContext = createContext();

const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();
const gitHubProvider = new GithubAuthProvider();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const { getUserInfo } = useContext(DataContext);

  const createUser = async (email, password) => {
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const uid = userCredential.user.uid;
      await logOut();
      return uid;
    } catch (error) {
      console.error(error);
      throw error;
    }
  };

  const signUpWithGmail = () => {
    setLoading(true);
    return signInWithPopup(auth, googleProvider);
  };

  const signUpWithGithub = () => {
    setLoading(true);
    return signInWithPopup(auth, gitHubProvider);
  };
  const login = (email, password) => {
    setLoading(true);
    return signInWithEmailAndPassword(auth, email, password);
  };

  const logOut = () => {
    localStorage.removeItem("genius-token");
    return signOut(auth);
  };


  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      if (currentUser) {
        try {
          const fullUser = await getUserInfo(currentUser.uid);
          setUser(fullUser);
        } catch (error) {
          console.error("Error fetching user data:", error);
          setUser(null);
        }
      } else {
        setUser(null);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, [getUserInfo]);

  const authInfo = {
    user,
    loading,
    createUser,
    login,
    logOut,
    signUpWithGmail,
    signUpWithGithub,
  };

  return (
    <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>
  );
};

export default AuthProvider;
