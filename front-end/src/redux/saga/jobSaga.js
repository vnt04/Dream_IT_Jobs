import axios from "axios";
import { call, put, takeLatest } from "redux-saga/effects";
import apiEndpoint from "../../api";
import {
  GET_JOBS,
  getJobsFailure,
  getJobsSuccess,
} from "../actions/jobActions";

function* getJobsSaga() {
  try {
    const response = yield call(axios.get, apiEndpoint.all_jobs);
    yield put(getJobsSuccess(response.data));
  } catch (error) {
    yield put(getJobsFailure(error.message));
  }
}
function* jobSaga() {
  yield takeLatest(GET_JOBS, getJobsSaga);
}

export default jobSaga;
