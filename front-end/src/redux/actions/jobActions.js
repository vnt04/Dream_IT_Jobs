export const GET_JOBS = "GET_JOBS";
export const GET_JOBS_SUCCESS = "GET_JOBS_SUCCESS";
export const GET_JOBS_FAILURE = "GET_JOBS_FAILURE";

export const getJobs = () => {
  return {
    type: GET_JOBS,
  };
};

export const getJobsSuccess = (data) => {
  return {
    type: GET_JOBS_SUCCESS,
    payload: data,
  };
};

export const getJobsFailure = (error) => {
  return {
    type: GET_JOBS_FAILURE,
    payload: error,
  };
};
