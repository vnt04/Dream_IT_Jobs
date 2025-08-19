import axios from "axios";

function requestApi(endpoint, method, body, responseType = "json") {
  const headers = {
    Accept: "application/json",
    "Content-Type": "application/json",
  };

  const instance = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
    headers,
    withCredentials: true,
  });

  instance.interceptors.request.use(
    (config) => {
      return config;
    },
    (error) => Promise.reject(error),
  );

  instance.interceptors.response.use(
    (response) => {
      return response;
    },
    async (error) => {
      const originalConfig = error.config;
      if (error.response && error.response.status === 419) {
        try {
          // call api to take new access token
          const result = await instance.get(
            `${import.meta.env.VITE_API_URL}/user/refresh-token`,
          );
          const { access_token } = result.data;
          originalConfig.headers["Authorization"] = `Bearer ${access_token}`;

          return instance(originalConfig);
        } catch (error) {
          return Promise.reject(error);
        }
      }
      return Promise.reject(error);
    },
  );

  return instance.request({
    method,
    url: endpoint,
    data: body,
    responseType,
  });
}

export default requestApi;
