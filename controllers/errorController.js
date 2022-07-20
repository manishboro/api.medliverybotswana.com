const AppError = require("./../utils/appError");

const handleCastErrorDB = (err) => {
  const message = `Invalid ${err.path} : ${err.value}`;
  return new AppError(message, 400);
};

const handleDuplicatesFieldsDB = (err) => {
  const value = err.errmsg.match(/(["'])(?:(?=(\\?))\2.)*?\1/)[0];
  const message = `Duplicate value : ${value}. Please use another value!`;
  return new AppError(message, 400);
};

const handleValidationErrorDB = (err) => {
  const errors = Object.values(err.errors).map((el) => el.message);
  const message = `Invalid input data. ${errors.join(". ")}`;
  return new AppError(message, 400);
};

const handleJWTError = () => {
  return new AppError("Please log in again. Invalid token!", 401);
};

const handleTokenExpiredError = () => {
  return new AppError("Please log in again. Your session has expired", 401);
};

const sendErrorDev = (err, req, res) => {
  // req.originalUrl gives us the url without the host name
  return res.status(err.statusCode).json({
    status: err.status,
    message: err.message,
    error: err,
    stack: err.stack,
  });
};

const sendErrorProd = (err, req, res) => {
  if (req.originalUrl.startsWith("/v1")) {
    //A)operational error, trusted errors: send message to client
    if (err.isOperational) {
      return res.status(err.statusCode).json({
        status: err.status,
        message: err.message,
      });
    }

    //B) programming or other unknown errors: dont leak error details
    return res.status(err.statusCode).json({
      message: "Something went wrong",
      status: "error",
    });
  }
};

module.exports = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || "error";

  if (process.env.ENVIRONMENT === "development") {
    sendErrorDev(err, req, res);
  } else if (process.env.ENVIRONMENT === "production") {
    if (err.name === "CastError") err = handleCastErrorDB(err);
    if (err.code === 11000) err = handleDuplicatesFieldsDB(err);
    if (err.name === "ValidationError") err = handleValidationErrorDB(err);
    if (err.name === "JsonWebTokenError") err = handleJWTError();
    if (err.name === "TokenExpiredError") err = handleTokenExpiredError();
    sendErrorProd(err, req, res);
  }
};
