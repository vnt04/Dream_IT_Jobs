// all api endpoint

const base_url = "http://localhost:5000";

const apiEndpoint = {
  all_jobs: `${base_url}/job`,
  job_detail: (jobID) => `${base_url}/job/${jobID}`,
};

export default apiEndpoint;
