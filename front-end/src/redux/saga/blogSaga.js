import axios from "axios";
import { call, put, takeLatest } from "redux-saga/effects";
import apiEndpoint from "../../api";
import {
  GET_BLOGS,
  getBlogsFailure,
  getBlogsSuccess,
} from "../actions/blogActions";

function* getBlogsSaga() {
  try {
    const response = yield call(axios.get, apiEndpoint.all_blog);
    yield put(getBlogsSuccess(response.data));
  } catch (error) {
    yield put(getBlogsFailure(error.message));
  }
}
function* blogSaga() {
  yield takeLatest(GET_BLOGS, getBlogsSaga);
}

export default blogSaga;
