import {
  LOGIN_REQUEST,
  LOGIN_WITH_GOOGLE,
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
  LOGOUT,
  LOGIN_WITH_GITHUB,
} from "../actions/authActions";

const initialState = {
  user: {
    uid: null,
    email: null,
    displayName: null,
    accessToken: null,
    emailVerified: false,
    photoURL: null,
  },
  loading: false,
  error: null,
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
      };
    case LOGIN_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case LOGOUT:
      return {
        ...state,
        user: initialState.user,
      };
    default:
      return state;
  }
};

export default authReducer;
