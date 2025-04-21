const express = require("express");
const {
  getAllRoom,
  getRoomDetailById,
  getRoomComment,
  createRoomComment,
} = require("../controllers/room.controller");
const {
  authorizedUserIdMiddleware,
} = require("../middlewares/auth.middleware");
const {
  validateBodyCreateRoomCommentDTO,
} = require("../middlewares/validation");

const router = express.Router();

router.get("/", getAllRoom);
router.get("/:id", getRoomDetailById);
router.get("/:id/comment", getRoomComment);
router.post(
  "/:id/comment",
  authorizedUserIdMiddleware,
  validateBodyCreateRoomCommentDTO,
  createRoomComment
);

module.exports = router;
