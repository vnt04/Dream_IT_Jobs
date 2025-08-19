import axios from "axios";
import requestApi from "./requestApi";

const preUrl = `${import.meta.env.VITE_API_URL}/user`;

const userApi = {
  signUp: async (displayName, email, password) => {
    const response = await axios.post(`${preUrl}/sign-up`, {
      displayName,
      email,
      password,
    });

    return response.data.message;
  },

  login: async (email, password) => {
    const response = await axios.post(`${preUrl}/login`, {
      email,
      password,
    });

    return response.data.data;
  },
  loginWithGoogle: async () => {
    const response = await axios.get(`${preUrl}/google-login`);
    console.log(response);
    return response;
  },

  getUserById: async (id) => {
    const response = await requestApi(`user?id=${id}`, "GET");
    return response.data;
  },

  getMe: async () => {
    const response = await requestApi("user/me", "GET");
    return response;
  },

  getUserByEmail: async (email) => {
    const response = await requestApi(`user?email=${email}`, "GET");
    return response.data;
  },

  isVerifiedEmail: async (email) => {
    const user = await userApi.getUserByEmail(email);
    return user.isVerifiedEmail;
  },

  verifyEmail: async (emailToken) => {
    const response = await requestApi("user/verify-email", "PATCH", {
      emailToken,
    });

    return response.data;
  },

  signOut: async () => {
    // localStorage.removeItem("current-user");
    // localStorage.removeItem("access_token");
    const response = await requestApi("user/logout", "GET");
    console.log(response);
  },
};

export default userApi;
