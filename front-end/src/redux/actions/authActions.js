export const LOGIN_REQUEST = "LOGIN_REQUEST";
export const LOGIN_WITH_GOOGLE = "LOGIN_WITH_GOOGLE";
export const LOGIN_WITH_GITHUB = "LOGIN_WITH_GITHUB";
export const LOGIN_SUCCESS = "LOGIN_SUCCESS";
export const LOGIN_FAILURE = "LOGIN_FAILURE";

export const SIGNUP_REQUEST = "SIGNUP_REQUEST";
export const SIGNUP_SUCCESS = "SIGNUP_SUCCESS";
export const SIGNUP_FAILURE = "SIGNUP_FAILURE";

export const LOGOUT = "LOGOUT";

export const loginRequest = (email, password) => {
  return {
    type: LOGIN_REQUEST,
    payload: { email, password },
  };
};
export const loginWithGoogle = () => {
  return {
    type: LOGIN_WITH_GOOGLE,
  };
};
export const loginWithGithub = () => {
  return {
    type: LOGIN_WITH_GITHUB,
  };
};
export const loginSuccess = (userData) => {
  return {
    type: LOGIN_SUCCESS,
    payload: userData,
  };
};

export const loginFailure = (error) => {
  return {
    type: LOGIN_FAILURE,
    payload: error,
  };
};

export const signUpRequest = (
  email,
  password,
  displayName,
) => {
  return {
    type: SIGNUP_REQUEST,
    payload: {
      email,
      password,
      displayName,
    },
  };
};

export const signUpSuccess = () => {
  return {
    type: SIGNUP_SUCCESS,
  };
};

export const signUpFailure = (error) => {
  return {
    type: SIGNUP_FAILURE,
    payload: error,
  };
};

export const logoutUser = () => {
  return {
    type: LOGOUT,
  };
};
