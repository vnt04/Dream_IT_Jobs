import { call, put, takeLatest } from "redux-saga/effects";
import axios from "axios";
import {
  LOGIN_REQUEST,
  LOGIN_WITH_GITHUB,
  LOGIN_WITH_GOOGLE,
  loginFailure,
  loginSuccess,
  LOGOUT,
  logoutUser,
  SIGNUP_REQUEST,
  signUpFailure,
  signUpSuccess,
} from "../actions/authActions";
import {
  getAuth,
  GoogleAuthProvider,
  GithubAuthProvider,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  createUserWithEmailAndPassword,
  sendEmailVerification,
} from "firebase/auth";
import app from "../../firebase/firebase.config";
import apiEndpoint from "../../api";

const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();
const gitHubProvider = new GithubAuthProvider();

function* createUser(email, password) {
  try {
    const userCredential = yield call(
      createUserWithEmailAndPassword,
      auth,
      email,
      password,
    );
    const uid = userCredential.user.uid;
    yield call(sendEmailVerification(userCredential.user));
    yield put(logoutUser());
    return uid;
  } catch (error) {
    yield put(signUpFailure(error.message));
  }
}

function* signUpSaga(action) {
  try {
    const uid = yield call(
      createUser,
      action.payload.email,
      action.payload.password,
    );
    if (uid) {
      const role = "candidate";
      yield call(axios.post, apiEndpoint.sign_up, {
        uid,
        email: action.payload.email,
        displayName: action.payload.displayName,
        role,
      });
      yield put(signUpSuccess());
    }
  } catch (error) {
    yield put(signUpFailure(error.message));
  }
}

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
    const response = yield call(
      axios.get,
      apiEndpoint.user_info(userCredential.user.uid),
    );
    const userData = response.data;
    yield put(
      loginSuccess(
        successPayload({
          ...userCredential.user,
          displayName: userData[0].displayName,
          photoURL: userData[0].photoURL,
        }),
      ),
    );
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
    localStorage.removeItem("current-user");
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
