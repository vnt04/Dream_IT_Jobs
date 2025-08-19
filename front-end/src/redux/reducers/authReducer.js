import {
  LOGIN_REQUEST,
  LOGIN_WITH_GOOGLE,
  LOGIN_WITH_GITHUB,
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
  SIGNUP_REQUEST,
  SIGNUP_SUCCESS,
  SIGNUP_FAILURE,
  LOGOUT,
  RESET,
} from "../actions/authActions";

const initialState = {
  user: null,
  loading: false,
  error: null,
  signUpSuccess: false,
  loginSuccess: false,
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN_REQUEST:
    case LOGIN_WITH_GOOGLE:
    case LOGIN_WITH_GITHUB:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case LOGIN_SUCCESS:
      return {
        ...state,
        loading: false,
        user: action.payload,
        error: null,
        loginSuccess: true,
      };
    case LOGIN_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case SIGNUP_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case SIGNUP_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
        signUpSuccess: true,
      };
    case SIGNUP_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    case LOGOUT:
    case RESET:
      return initialState;

    default:
      return state;
  }
};

export default authReducer;
