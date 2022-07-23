const mongoose = require("mongoose");
const validator = require("validator");
const { nanoid } = require("nanoid");

const patientSchema = new mongoose.Schema({
  uid: { type: String, default: () => nanoid(), unique: true },
  login_provider_id: { type: String, required: [true, "Required loginProviderId"] },
  display_name: { type: String },
  first_name: { type: String },
  middle_name: { type: String },
  last_name: { type: String },
  gender: { type: String, enum: ["male", "female", "others"] },
  email: {
    type: String,
    required: [true, "Please tell us your email"],
    unique: true,
    lowercase: true,
    validate: [validator.isEmail, "Please provide a valid email"],
  },
  email_verified: { type: Boolean },
  login_pin: { type: String, select: false, length: 4 },
  is_login_pin: { type: Boolean, default: false },
  photo_url: {
    type: String,
    default: "https://d1dy7octuuq2cp.cloudfront.net/assets/images/avatar.png",
  },
  disable_profile_pic: { type: Boolean, default: false },
  date_of_birth: { type: String },
  mobile: { type: String },
  country: { type: String },
  state: { type: String },
  city: { type: String },
  address: { type: String },
  zipcode: { type: String },
  latitude: { type: String },
  longitude: { type: String },
  organization_id: { type: mongoose.Schema.Types.ObjectId, ref: "Organization" },
  organization_type: { type: String },
  login_type: {
    type: String,
    enum: ["google", "facebook", "twitter", "microsoft", "phone", "password"],
    required: [true, "Please provide login type"],
  },
  terms_and_conditions: { type: Boolean, default: true },
  is_active: { type: Boolean, default: true },
});

const Patient = mongoose.model("Patient", patientSchema);
module.exports = Patient;
