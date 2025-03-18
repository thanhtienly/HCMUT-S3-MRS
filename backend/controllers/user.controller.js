require("dotenv").config();
const userService = require("../services/user.service");

const signUp = (req, res) => {
  res.json({
    message: "Success",
  });
};

module.exports = { signUp };
