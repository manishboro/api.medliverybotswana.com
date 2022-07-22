const Patient = require("../models/Patient");
const allowedFields = require("../utils/allowedFields");
const catchAsync = require("../utils/catchAsync");
const { validateReqFields } = require("../utils/validateReqFields");

const patient_fields = ["login_provider_id", "display_name", "photo_url", "email", "login_type"];

exports.patientLogin = catchAsync(async (req, res, next) => {
  validateReqFields(req, next, patient_fields);
  const filteredBody = allowedFields(req.body, patient_fields);

  const { login_provider_id } = req.body;

  let patient;
  const existingPatient = await Patient.findOne({ login_provider_id });

  if (existingPatient) {
    patient = await Patient.findOneAndUpdate({ login_provider_id }, filteredBody, {
      new: true,
      runValidators: true,
    });
  } else {
    patient = await Patient.create(filteredBody);
  }

  res.status(200).json({ success: true, message: "Login successful", payload: patient });
});
