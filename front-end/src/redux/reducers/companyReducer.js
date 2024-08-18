import {
  GET_COMPANY,
  GET_COMPANY_SUCCESS,
  GET_COMPANY_FAILURE,
} from "../actions/companyActions";

const initialState = {
  dataCompany: [],
  loadingCompany: false,
  errorCompany: null,
};

const companyReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_COMPANY:
      return {
        ...state,
        loadingCompany: true,
      };
    case GET_COMPANY_SUCCESS:
      return {
        ...state,
        loadingCompany: false,
        dataCompany: action.payload,
      };
    case GET_COMPANY_FAILURE:
      return {
        ...state,
        loadingCompany: false,
        errorCompany: action.payload,
      };
    default:
      return state;
  }
};

export default companyReducer;
