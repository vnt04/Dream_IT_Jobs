import {
  GET_RECRUITERS,
  GET_RECRUITERS_SUCCESS,
  GET_RECRUITERS_FAILURE,
} from "../actions/recruiterAction";

const initialState = {
  dataRecruiters: [],
  loadingRecruiters: false,
  errorRecruiters: null,
};

const recruiterReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_RECRUITERS:
      return {
        ...state,
        loadingRecruiters: true,
      };
    case GET_RECRUITERS_SUCCESS:
      return {
        ...state,
        loadingRecruiters: false,
        dataRecruiters: action.payload,
      };
    case GET_RECRUITERS_FAILURE:
      return {
        ...state,
        loadingRecruiters: false,
        errorRecruiters: action.payload,
      };
    default:
      return state;
  }
};

export default recruiterReducer;
