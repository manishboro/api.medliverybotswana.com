const AppError = require("./appError");

exports.validateReqFields = (req, res, next, requiredFields) => {
  for (const field of requiredFields) {
    if (!req.body[field]) throw next(new AppError(`You have to provide ${field}`, 400));
  }
  return true;
};
