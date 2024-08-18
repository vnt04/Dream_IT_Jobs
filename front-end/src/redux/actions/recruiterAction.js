export const GET_RECRUITERS = "GET_RECRUITERS";
export const GET_RECRUITERS_SUCCESS = "GET_RECRUITERS_SUCCESS";
export const GET_RECRUITERS_FAILURE = "GET_RECRUITERS_FAILURE";

export const getRecruiter = () => {
  return {
    type: GET_RECRUITERS,
  };
};

export const getRecruiterSuccess = (data) => {
  return {
    type: GET_RECRUITERS_SUCCESS,
    payload: data,
  };
};

export const getRecruiterFailure = (error) => {
  return {
    type: GET_RECRUITERS_FAILURE,
    payload: error,
  };
};
