export const GET_BLOGS = "GET_BLOGS";
export const GET_BLOGS_SUCCESS = "GET_BLOGS_SUCCESS";
export const GET_BLOGS_FAILURE = "GET_BLOGS_FAILURE";

export const getBlogs = () => {
  return {
    type: GET_BLOGS,
  };
};

export const getBlogsSuccess = (data) => {
  return {
    type: GET_BLOGS_SUCCESS,
    payload: data,
  };
};

export const getBlogsFailure = (error) => {
  return {
    type: GET_BLOGS_FAILURE,
    payload: error,
  };
};
