const { Comment } = require("../models/Comment");
const { v4: uuidv4 } = require("uuid");

const createComment = async ({ userId, roomId, content }) => {
  return await Comment.create({
    id: uuidv4(),
    userId: userId,
    roomId: roomId,
    content: content,
    createdAt: new Date().getTime(),
  });
};

const findCommentByRoomId = async ({ roomId }) => {
  return await Comment.findAll({
    where: {
      roomId,
    },
  });
};

module.exports = { createComment, findCommentByRoomId };
