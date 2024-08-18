// all api endpoint

const base_url = "http://localhost:5000/api/v1";

const apiEndpoint = {
  //jobs
  all_jobs: `${base_url}/job`,
  job_detail: (jobID) => `${base_url}/job/${jobID}`,
  search_job: `${base_url}/job/search`,

  //auth
  sign_up: `${base_url}/user/sign-up`,

  //user
  all_user: `${base_url}/user`,
  all_recruiter: `${base_url}/recruiter`,
  user_info: (uid) => `${base_url}/user/${uid}`,

  //company
  all_company: `${base_url}/company`,
  search_company: `${base_url}/company/search`,
  company_detail: (companyID) => `${base_url}/cong-ty-IT/${companyID}`,
  company_add: `${base_url}/company/add`,

  //blog
  all_blog: `${base_url}/blog`,
};

export default apiEndpoint;
