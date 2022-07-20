const mongoose = require("mongoose");
const validator = require("validator");
const { nanoid } = require("nanoid");

const patientSchema = new mongoose.Schema({
  uid: { type: String, default: () => nanoid(), unique: true },
  loginProviderId: {
    type: String,
    required: [true, "Required loginProviderId"],
  },
  displayName: { type: String },
  firstName: { type: String },
  middleName: { type: String },
  lastName: { type: String },
  gender: { type: String, enum: ["male", "female", "others"] },
  email: {
    type: String,
    required: [true, "Please tell us your email"],
    unique: true,
    lowercase: true,
    validate: [validator.isEmail, "Please provide a valid email"],
  },
  profilePic: { type: String, default: "/static/icons/avatar.png" },
  disableProfilePic: { type: Boolean, default: false },
  dateOfBirth: {
    type: String,
    required: [true, "Please tell us your date of birth"],
  },
  mobileNo: { type: String, unique: true },
  state: { type: String },
  city: { type: String },
  address: { type: String },
  zipcode: { type: String },
  latitude: { type: String },
  longitude: { type: String },
  organizationId: { type: mongoose.Schema.Types.ObjectId, ref: "Organization" },
  organizationType: { type: String },
  loginType: {
    type: String,
    enum: ["google", "facebook", "twitter", "microsoft", "phone", "password"],
  },
  isActive: { type: Boolean, default: true },
});

const Patient = mongoose.model("Patient", patientSchema);
module.exports = Patient;
