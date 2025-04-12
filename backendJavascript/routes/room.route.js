const express = require("express");
const {
  getAllRoom,
  getRoomDetailById,
} = require("../controllers/room.controller");

const router = express.Router();

router.get("/", getAllRoom);
router.get("/:id", getRoomDetailById);

module.exports = router;
