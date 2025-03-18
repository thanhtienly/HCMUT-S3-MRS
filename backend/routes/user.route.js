const { Router } = require("express");
const userController = require("../controllers/user.controller");
const router = Router();

router.get("/test", userController.signUp);

module.exports = router;
