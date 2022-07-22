const AppError = require("./appError");

exports.validateReqFields = (req, next, requiredFields, mode = "body") => {
  for (const field of requiredFields) {
    if (mode === "body" && !req.body[field])
      throw next(new AppError(`You have to provide ${field}`, 400));

    if (mode === "query" && !req.query[field])
      throw next(new AppError(`You have to provide ${field}`, 400));
  }
  return true;
};
