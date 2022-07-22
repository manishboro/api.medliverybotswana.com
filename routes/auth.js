const router = require("express").Router();
const authController = require("../controllers/authController");

router.post("/patient/signin", authController.patientLogin);

module.exports = router;
