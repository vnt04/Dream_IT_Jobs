import { call, put, takeLatest } from "redux-saga/effects";
import axios from "axios";
import {
  LOGIN_REQUEST,
  LOGIN_WITH_GITHUB,
  LOGIN_WITH_GOOGLE,
  loginFailure,
  loginSuccess,
  LOGOUT,
} from "../actions/authActions";
import {
  getAuth,
  GoogleAuthProvider,
  GithubAuthProvider,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
} from "firebase/auth";
import app from "../../firebase/firebase.config";
import apiEndpoint from "../../api";

const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();
const gitHubProvider = new GithubAuthProvider();

const successPayload = (user) => {
  return {
    uid: user.uid,
    email: user.email,
    displayName: user.displayName,
    accessToken: user.accessToken,
    emailVerified: user.emailVerified,
    photoURL: user.photoURL,
  };
};

function* loginSaga(action) {
  try {
    const { email, password } = action.payload;
    const userCredential = yield call(
      signInWithEmailAndPassword,
      auth,
      email,
      password,
    );
    yield put(loginSuccess(successPayload(userCredential.user)));
  } catch (error) {
    yield put(loginFailure(error.message));
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
    yield put(loginFailure(error.message));
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
    yield call(signOut, auth);
  } catch (error) {
    console.log(error);
  }
}

function* authSaga() {
  yield takeLatest(LOGIN_REQUEST, loginSaga);
  yield takeLatest(LOGIN_WITH_GOOGLE, loginWithGoogleSaga);
  yield takeLatest(LOGIN_WITH_GITHUB, loginWithGithubSaga);
  yield takeLatest(LOGOUT, logoutSaga);
}

export default authSaga;
