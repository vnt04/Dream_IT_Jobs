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

  getUserById: async (id) => {
    const response = await requestApi(`user?id=${id}`, "GET");
    return response.data;
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

  signOut: () => {
    localStorage.removeItem("current-user");
    localStorage.removeItem("access_token");
  },
};

export default userApi;
