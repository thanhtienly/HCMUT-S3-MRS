require("dotenv").config();
const express = require("express");
const { sequelize, initDB } = require("./config/database");

const PORT = process.env.PORT || 8000;

const { Reservation } = require("./models/Reservation");
const { Room } = require("./models/Room");
const { SelfStudyArea } = require("./models/SelfStudyArea");
const associations = require("./models/associations");
const { seed } = require("./config/seed");

/* Import routes */
const bookingRoute = require("./routes/booking.route");
const roomRoute = require("./routes/room.route");

const app = express();
app.use(express.json());

app.use("/booking", bookingRoute);
app.use("/room", roomRoute);

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
