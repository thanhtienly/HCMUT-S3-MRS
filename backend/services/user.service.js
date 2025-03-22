const { User } = require("../models/User");
const { Student } = require("../models/Student");
const { v4: uuidv4 } = require("uuid");

const findUserByEmail = async (email) => {
  var student = await User.findOne({ where: { email: email } });
  return student;
};

const createUser = async ({ email, password, role }, { transaction }) => {
  var user = await User.create(
    {
      id: uuidv4(),
      email: email,
      password: password,
      role: role,
    },
    { transaction: transaction }
  );
  return user;
};

const createStudentProfile = async (
  { userId, studentId, gender, firstName, lastName, phone, birthday },
  { transaction }
) => {
  var profile = await Student.create(
    {
      userId,
      studentId,
      gender,
      firstName,
      lastName,
      phone,
      birthday,
    },
    { transaction: transaction }
  );

  return profile;
};

const findStudentByUserId = async (userId) => {
  var student = await Student.findOne({
    where: {
      userId: userId,
    },
  });
  return student;
};

module.exports = {
  findUserByEmail,
  createUser,
  createStudentProfile,
  findStudentByUserId,
};
