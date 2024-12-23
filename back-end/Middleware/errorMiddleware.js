const errorMiddleware = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.message = err.message || "Internal Server Error.";

  //Validation errors
  if (err.name === "ValidationError") {
    err.statusCode = 400;
  }

  

  res.status(err.statusCode).json({
    success: false,
    message: err.message,
  });
};

module.exports = errorMiddleware;
