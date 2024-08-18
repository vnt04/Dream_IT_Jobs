import {
  GET_JOBS,
  GET_JOBS_SUCCESS,
  GET_JOBS_FAILURE,
} from "../actions/jobActions";

const initialState = {
  dataJobs: [],
  loadingJobs: false,
  errorJobs: null,
};

const jobReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_JOBS:
      return {
        ...state,
        loadingJobs: true,
      };
    case GET_JOBS_SUCCESS:
      return {
        ...state,
        loadingJobs: false,
        dataJobs: action.payload,
      };
    case GET_JOBS_FAILURE:
      return {
        ...state,
        loadingJobs: false,
        errorJobs: action.payload,
      };
    default:
      return state;
  }
};

export default jobReducer;
