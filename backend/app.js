require("dotenv").config();
const express = require("express");
const { sequelize, initDB } = require("./config/database");

const PORT = process.env.PORT || 8000;
const { CheckIn } = require("./models/CheckIn");
const { Feedback } = require("./models/Feedback");
const { Manager } = require("./models/Manager");
const { Repair } = require("./models/Repair");
const { Reservation } = require("./models/Reservation");
const { Room } = require("./models/Room");
const { SelfStudyArea } = require("./models/SelfStudyArea");
const { Staff } = require("./models/Staff");
const { Student } = require("./models/Student");
const { User } = require("./models/User");
const associations = require("./models/associations");

/* Import routes */
const userRoute = require("./routes/user.route");
const managementRoute = require("./routes/management.route");

const app = express();
app.use(express.json());

app.use("/user", userRoute);
app.use("/management", managementRoute);

initDB()
  .then(() => {
    sequelize.sync().then(() => {
      console.log("Connected to MySQL");
      app.listen(PORT, () => {
        console.log(`Example app listening on port ${PORT}`);
      });
    });
  })
  .catch((error) => {
    console.log(error);
  });
