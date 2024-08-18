import { configureStore } from "@reduxjs/toolkit";
import createSagaMiddleware from "redux-saga";

import rootReducer from "../reducers";
import authSaga from "../saga/authSaga";
import jobSaga from "../saga/jobSaga";
import blogSaga from "../saga/blogSaga";
import companySaga from "../saga/companySaga";
import recruiterSaga from "../saga/recruiterSaga";

const sagaMiddleware = createSagaMiddleware();

const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(sagaMiddleware),
});

sagaMiddleware.run(authSaga);
sagaMiddleware.run(jobSaga);
sagaMiddleware.run(blogSaga);
sagaMiddleware.run(companySaga);
sagaMiddleware.run(recruiterSaga);

export default store;
