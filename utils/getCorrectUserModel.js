const Patient = require('../models/patientModel')
const Doctor = require('../models/doctorModel')

exports.getCorrectUserModel = (userType) => {
    if (userType === "patient") return Patient;
    if (userType === "doctor") return Doctor;
  };