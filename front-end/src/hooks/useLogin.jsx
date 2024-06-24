/* eslint-disable react-hooks/rules-of-hooks */
import { useContext } from "react";
import axios from "axios";
import apiEndpoint from "../api";
import { AuthContext } from "../context/AuthProvider";
import useAuth from "./useAuth";

const useLogin = () => {
  const { signUpWithGmail, signUpWithGithub, login, logOut } =
    useContext(AuthContext);
  const { handleAuthError, successLogin, successLogout } = useAuth();
  const role = "candidate";

  const loginWithGoogle = () => {
    signUpWithGmail()
      .then((result) => {
        console.log(result);
        const { uid, email, displayName, photoURL } = result.user;
        axios.post(apiEndpoint.sign_up, {
          uid,
          email,
          displayName,
          photoURL,
          role,
        });
        successLogin();
      })
      .catch((error) => {
        handleAuthError(error);
      });
  };
  const loginWithGithub = () => {
    signUpWithGithub()
      .then((result) => {
        const { uid, email, displayName, photoURL } = result.user;
        axios.post(apiEndpoint.sign_up, {
          uid,
          email,
          displayName,
          photoURL,
          role,
        });
        successLogin();
      })
      .catch((error) => {
        handleAuthError(error);
      });
  };
  const loginWithEmail = (email, password) => {
    login(email, password)
      .then(() => {
        successLogin();
      })
      .catch((error) => {
        handleAuthError(error);
      });
  };
  const handleLogout = () => {
    logOut()
      .then(() => {
        successLogout();
      })
      .catch((error) => {
        handleAuthError(error);
      });
  };
  return {
    loginWithGoogle,
    loginWithGithub,
    loginWithEmail,
    handleLogout,
  };
};

export default useLogin;
