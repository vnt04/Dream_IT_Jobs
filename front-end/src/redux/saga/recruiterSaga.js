import axios from "axios";
import { call, put, takeLatest } from "redux-saga/effects";
import apiEndpoint from "../../api";
import {
  GET_RECRUITERS,
  getRecruiterFailure,
  getRecruiterSuccess,
} from "../actions/recruiterAction";

function* getRecruitersSaga() {
  try {
    const response = yield call(axios.get, apiEndpoint.all_recruiter);
    yield put(getRecruiterSuccess(response.data));
  } catch (error) {
    yield put(getRecruiterFailure(error.message));
  }
}
function* recruiterSaga() {
  yield takeLatest(GET_RECRUITERS, getRecruitersSaga);
}

export default recruiterSaga;
