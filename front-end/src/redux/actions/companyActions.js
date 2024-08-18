export const GET_COMPANY = "GET_COMPANY";
export const GET_COMPANY_SUCCESS = "GET_COMPANY_SUCCESS";
export const GET_COMPANY_FAILURE = "GET_COMPANY_FAILURE";

export const getCompany = () => {
  return {
    type: GET_COMPANY,
  };
};

export const getCompanySuccess = (data) => {
  return {
    type: GET_COMPANY_SUCCESS,
    payload: data,
  };
};

export const getCompanyFailure = (error) => {
  return {
    type: GET_COMPANY_FAILURE,
    payload: error,
  };
};
