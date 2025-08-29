import { call, put, takeLatest } from "redux-saga/effects";
import {
  LOGIN_REQUEST,
  loginFailure,
  loginSuccess,
  LOGOUT,
  SIGNUP_REQUEST,
  signUpFailure,
  signUpSuccess,
} from "../actions/authActions";

import userApi from "../../api/userApi";

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

    yield call(userApi.login, email, password);
    // const userPayload = jwt.decode(response.access_token);

    const userLogin = yield call(userApi.getMe());

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

function* logoutSaga() {
  try {
    yield call(userApi.signOut);
  } catch (error) {
    console.log(error);
  }
}

function* authSaga() {
  yield takeLatest(LOGIN_REQUEST, loginSaga);

  yield takeLatest(SIGNUP_REQUEST, signUpSaga);

  yield takeLatest(LOGOUT, logoutSaga);
}

export default authSaga;
