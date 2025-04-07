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
const { seed } = require("./config/seed");

/* Import routes */
const userRoute = require("./routes/user.route");
const bookingRoute = require("./routes/booking.route");

const app = express();
app.use(express.json());

app.use("/user", userRoute);
app.use("/booking", bookingRoute);

initDB()
  .then(() => {
    sequelize.sync({ force: true }).then(async () => {
      console.log("Connected to MySQL");
      await seed();
      app.listen(PORT, () => {
        console.log(`Example app listening on port ${PORT}`);
      });
    });
  })
  .catch((error) => {
    console.log(error);
  });
