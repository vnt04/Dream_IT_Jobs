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
  sendPasswordResetEmail,
  sendEmailVerification,
} from "firebase/auth";
import { DataContext } from "./DataProvider";

export const AuthContext = createContext();

const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();
const gitHubProvider = new GithubAuthProvider();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [lastActivityTime, setLastActivityTime] = useState(Date.now());
  const { getUserInfo } = useContext(DataContext);

  const createUser = async (email, password) => {
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password,
      );
      await sendEmailVerification(userCredential.user);
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
  const resetPassword = (email) => {
    return sendPasswordResetEmail(auth, email);
  };
  const signUpWithGithub = () => {
    setLoading(true);
    return signInWithPopup(auth, gitHubProvider);
  };
  const login = async (email, password) => {
    setLoading(true);
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password,
      );
      const token = await userCredential.user.getIdToken();
      localStorage.setItem("genius-token", token);
      return userCredential;
    } catch (error) {
      console.error("Login failed:", error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const logOut = () => {
    localStorage.removeItem("genius-token");
    return signOut(auth);
  };
  useEffect(() => {
    const updateLastActivityTime = () => setLastActivityTime(Date.now());
    window.addEventListener("mousemove", updateLastActivityTime);
    window.addEventListener("keypress", updateLastActivityTime);
    window.addEventListener("click", updateLastActivityTime);

    return () => {
      window.removeEventListener("mousemove", updateLastActivityTime);
      window.removeEventListener("keypress", updateLastActivityTime);
      window.removeEventListener("click", updateLastActivityTime);
    };
  }, []);

  useEffect(() => {
    const maxInactiveTime = 1 * 60 * 1000; // 15 phút

    const interval = setInterval(() => {
      if (Date.now() - lastActivityTime > maxInactiveTime) {
        logOut();
        clearInterval(interval);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [lastActivityTime]);

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
    resetPassword,
    signUpWithGithub,
  };

  return (
    <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>
  );
};

export default AuthProvider;
