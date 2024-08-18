import {
  GET_BLOGS,
  GET_BLOGS_SUCCESS,
  GET_BLOGS_FAILURE,
} from "../actions/blogActions";

const initialState = {
  dataBlogs: [],
  loadingBlogs: false,
  errorBlogs: null,
};

const blogReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_BLOGS:
      return {
        ...state,
        loadingBlogs: true,
      };
    case GET_BLOGS_SUCCESS:
      return {
        ...state,
        loadingBlogs: false,
        dataBlogs: action.payload,
      };
    case GET_BLOGS_FAILURE:
      return {
        ...state,
        loadingBlogs: false,
        errorBlogs: action.payload,
      };
    default:
      return state;
  }
};

export default blogReducer;
