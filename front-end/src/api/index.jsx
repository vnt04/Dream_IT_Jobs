// all api endpoint

const base_url = "http://localhost:5000";

const apiEndpoint = {
  all_jobs: `${base_url}/job`,
  job_detail: (jobID) => `${base_url}/job/${jobID}`,
  sign_up: `${base_url}/user/sign-up`,
  all_user: `${base_url}/user`,
  user_info: (uid) => `${base_url}/user/${uid}`,
  all_company: `${base_url}/company`,
  all_blog: `${base_url}/blog`,
};

export default apiEndpoint;
