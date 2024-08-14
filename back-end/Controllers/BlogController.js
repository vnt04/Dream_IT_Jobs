const Blog = require("../Models/blogModel");

class BlogController {
  index(req, res, next) {
    Blog.find({})
      .then((blog) => res.status(200).json(blog))
      .catch((error) => next(error));
  }
}

module.exports = new BlogController();
