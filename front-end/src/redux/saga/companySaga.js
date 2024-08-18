import axios from "axios";
import { call, put, takeLatest } from "redux-saga/effects";
import apiEndpoint from "../../api";
import {
  GET_COMPANY,
  getCompanyFailure,
  getCompanySuccess,
} from "../actions/companyActions";

function* getCompanySaga() {
  try {
    const response = yield call(axios.get, apiEndpoint.all_company);
    yield put(getCompanySuccess(response.data));
  } catch (error) {
    yield put(getCompanyFailure(error.message));
  }
}
function* companySaga() {
  yield takeLatest(GET_COMPANY, getCompanySaga);
}

export default companySaga;
