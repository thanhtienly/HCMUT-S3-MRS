require("dotenv").config();
const { sequelize } = require("../config/database");
const userService = require("../services/user.service");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const JWT_ACCESS_TOKEN_SECRET = process.env.JWT_ACCESS_TOKEN_SECRET;
const JWT_ACCESS_TOKEN_LIFETIME = process.env.JWT_ACCESS_TOKEN_LIFETIME;

const JWT_REFRESH_TOKEN_SECRET = process.env.JWT_REFRESH_TOKEN_SECRET;
const JWT_REFRESH_TOKEN_LIFETIME = process.env.JWT_REFRESH_TOKEN_LIFETIME;

const signUpStudent = async (req, res) => {
  /*
    Request Body: {
      email: require,
      password: require,
      studentId: require,
      firstName: require,
      lastName: require,
      birthday: require, format YYYY-MM-DD, 
      gender: require, Enum("Nam", "Nữ", "Khác"),
      phone: require
    }
  */

  const {
    password,
    email,
    studentId,
    firstName,
    lastName,
    birthday,
    gender,
    phone,
  } = req.body;

  try {
    var user = await userService.findUserByEmail(email);
  } catch (error) {
    console.log(error);
    return res.status(400).json({ message: "Email invalid" });
  }

  /* Student exist */
  if (user) {
    return res.status(400).json({
      message: "Email is already used",
    });
  }

  var transaction = await sequelize.transaction();

  var hashPassword = await bcrypt.hash(password, 10);
  try {
    /* Create user with email, password */
    user = await userService.createUser(
      {
        email: email,
        password: hashPassword,
        role: "Student",
      },
      { transaction: transaction }
    );

    /* Create Student profile */
    var student = await userService.createStudentProfile(
      {
        userId: user["id"],
        studentId,
        gender,
        firstName,
        lastName,
        phone,
        birthday,
      },
      { transaction: transaction }
    );
    console.log(student);
  } catch (error) {
    await transaction.rollback();
    console.log(error);
    if (error["name"] == "SequelizeUniqueConstraintError") {
      return res.status(400).json({ message: error["errors"][0]["message"] });
    }

    return res.status(400).json({ message: "Create user failed" });
  }

  await transaction.commit();

  res.json({
    message: "Sign up successfully",
  });
};

const logInStudent = async (req, res) => {
  /*
    Request body: {
      email: require,
      password: require
    }
  */
  const { email, password } = req.body;

  var user = await userService.findUserByEmail(email);

  if (!user) {
    return res
      .status(403)
      .json({ message: "Account not found, please sign up before log in" });
  }

  const isValidPassword = await bcrypt.compare(password, user["password"]);

  if (!isValidPassword) {
    return res.status(401).json({ message: "Password is not match" });
  }

  var profile = await userService.findStudentByUserId(user["id"]);

  console.log(profile);
  const accessToken = jwt.sign(
    {
      userId: user["id"],
      role: user["role"],
      studentId: profile["studentId"],
      firstName: profile["firstName"],
      lastName: profile["lastName"],
    },
    JWT_ACCESS_TOKEN_SECRET,
    {
      expiresIn: JWT_ACCESS_TOKEN_LIFETIME,
    }
  );

  const refreshToken = jwt.sign(
    {
      userId: user["id"],
      role: user["role"],
      studentId: profile["studentId"],
      firstName: profile["firstName"],
      lastName: profile["lastName"],
    },
    JWT_REFRESH_TOKEN_SECRET,
    {
      expiresIn: JWT_REFRESH_TOKEN_LIFETIME,
    }
  );

  res.json({
    accessToken,
    refreshToken,
  });
};

const getBookingHistory = async (req, res) => {
  const user = req["user"];

  res.json({
    data: {
      userId: "1",
      email: "tien.lythanh@hcmut.edu.vn",
    },
  });
};

module.exports = { signUpStudent, logInStudent, getBookingHistory };
