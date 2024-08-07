// all api endpoint

const base_url = "http://localhost:5000";

const apiEndpoint = {
  all_jobs: `${base_url}/job`,
  job_detail: (jobID) => `${base_url}/job/${jobID}`,
  search_job: `${base_url}/job/search`,
  sign_up: `${base_url}/user/sign-up`,
  all_user: `${base_url}/user`,
  all_recruiter: `${base_url}/recruiter`,
  user_info: (uid) => `${base_url}/user/${uid}`,
  all_company: `${base_url}/company`,
  search_company: `${base_url}/company/search`,
  company_detail: (companyID) => `${base_url}/cong-ty-IT/${companyID}`,
  company_add: `${base_url}/company/add`,
  all_blog: `${base_url}/blog`,
};

export default apiEndpoint;
