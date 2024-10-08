import { useContext } from "react";
import axios from "axios";
import apiEndpoint from "../api";
import { AuthContext } from "../context/AuthProvider";
import useNotification from "./useNotification";

const useSignUp = () => {
  const { createUser } = useContext(AuthContext);
  const { errorHandler, successSignUp, checkConfirmPassword } = useNotification;
  const signUpCandidate = async (
    displayName,
    email,
    password,
    confirmPassword,
  ) => {
    if (checkConfirmPassword(password, confirmPassword)) {
      try {
        const uid = await createUser(email, password);
        if (uid) {
          successSignUp(email);
          const role = "candidate";
          await axios.post(apiEndpoint.sign_up, {
            uid,
            email,
            displayName,
            role,
          });
        }
      } catch (error) {
        errorHandler(error);
      }
    }
  };

  const signUpRecruiter = async (
    email,
    password,
    confirmPassword,
    company,
    phone,
    displayName,
    position,
    mst,
    onSuccess,
  ) => {
    if (checkConfirmPassword(password, confirmPassword)) {
      try {
        const uid = await createUser(email, password);
        if (uid) {
          // successSignUp();
          const role = "recruiter";
          await axios.post(apiEndpoint.sign_up, {
            uid,
            email,
            displayName,
            role,
            company,
            phone,
            mst,
            position,
          });
          onSuccess();
        }
      } catch (error) {
        errorHandler(error);
      }
    }
  };

  return { signUpCandidate, signUpRecruiter };
};

export default useSignUp;
