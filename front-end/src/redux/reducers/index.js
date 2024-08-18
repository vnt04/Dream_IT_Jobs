import { combineReducers } from "redux";

import authReducer from "./authReducer";
import jobReducer from "./jobReducer";
import companyReducer from "./companyReducer";
import blogReducer from "./blogReducer";
import recruiterReducer from "./recruiterReducer";

const rootReducer = combineReducers({
  auth: authReducer,
  job: jobReducer,
  company: companyReducer,
  blog: blogReducer,
  recruiter: recruiterReducer,
});

export default rootReducer;
