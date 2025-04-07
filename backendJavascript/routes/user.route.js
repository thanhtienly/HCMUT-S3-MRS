const { Router } = require("express");
const userController = require("../controllers/user.controller");
const router = Router();

router.post("/student/sign-up", userController.signUpStudent);
router.post("/student/log-in", userController.logInStudent);

module.exports = router;
