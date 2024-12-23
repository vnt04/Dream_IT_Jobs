import { call, put, takeLatest } from "redux-saga/effects";
import jwt from "jsonwebtoken";
import axios from "axios";
import {
  LOGIN_REQUEST,
  LOGIN_WITH_GITHUB,
  LOGIN_WITH_GOOGLE,
  loginFailure,
  loginSuccess,
  LOGOUT,
  SIGNUP_REQUEST,
  signUpFailure,
  signUpSuccess,
} from "../actions/authActions";
import {
  getAuth,
  GoogleAuthProvider,
  GithubAuthProvider,
  signInWithPopup,
} from "firebase/auth";
import app from "../../firebase/firebase.config";
import apiEndpoint from "../../api";
import userApi from "../../api/userApi";

const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();
const gitHubProvider = new GithubAuthProvider();

function* signUpSaga(action) {
  try {
    const userData = action.payload;
    yield call(
      userApi.signUp,
      userData.displayName,
      userData.email,
      userData.password,
    );
    yield put(signUpSuccess());
  } catch (error) {
    yield put(signUpFailure(error.response.data.message));
  }
}

const successPayload = (user) => {
  return {
    email: user.email,
    displayName: user.displayName,
    photoURL: user.photoURL,
  };
};

function* loginSaga(action) {
  try {
    const { email, password } = action.payload;

    const response = yield call(userApi.login, email, password);
    const userPayload = jwt.decode(response.access_token);

    localStorage.setItem("access_token", response.access_token);
    const userLogin = yield call(userApi.getUserById, userPayload.sub);

    if (userLogin) {
      const isEmailVerified = yield call(
        userApi.isVerifiedEmail,
        userLogin.email,
      );
      if (isEmailVerified) {
        yield put(loginSuccess(successPayload(userLogin)));
      } else {
        yield call(userApi.signOut);
        window.location.href = `/verify-email?email=${userLogin.email}`;
      }
    }
  } catch (error) {
    // console.log(error.response.data.message);
    yield put(loginFailure(error.response.data.message));
  }
}

const existsUser = true;
const role = "candidate";
function* loginWithGoogleSaga() {
  try {
    const userCredential = yield call(signInWithPopup, auth, googleProvider);
    if (!existsUser) {
      const { uid, email, displayName, photoURL } = userCredential.user;
      const response = yield call(axios.post, apiEndpoint.sign_up, {
        uid,
        email,
        displayName,
        photoURL,
        role,
      });
    } else {
      yield put(loginSuccess(successPayload(userCredential.user)));
    }
  } catch (error) {
    console.log(error.response.data.message);
    yield put(loginFailure(error.response.data.message));
  }
}

function* loginWithGithubSaga() {
  try {
    const userCredential = yield call(signInWithPopup, auth, gitHubProvider);

    const { uid, email, displayName, photoURL } = userCredential.user;
    if (!existsUser) {
      const response = yield call(axios.post, apiEndpoint.sign_up, {
        uid,
        email,
        displayName,
        photoURL,
        role,
      });
    } else {
      yield put(loginSuccess(successPayload(userCredential.user)));
    }
  } catch (error) {
    yield put(loginFailure(error.message));
  }
}

function* logoutSaga() {
  try {
    yield call(userApi.signOut);
  } catch (error) {
    console.log(error);
  }
}

function* authSaga() {
  yield takeLatest(LOGIN_REQUEST, loginSaga);
  yield takeLatest(LOGIN_WITH_GOOGLE, loginWithGoogleSaga);
  yield takeLatest(LOGIN_WITH_GITHUB, loginWithGithubSaga);

  yield takeLatest(SIGNUP_REQUEST, signUpSaga);

  yield takeLatest(LOGOUT, logoutSaga);
}

export default authSaga;
