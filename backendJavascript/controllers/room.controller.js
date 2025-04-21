const {
  findAllRoom,
  findRoomDetailById,
  findRoomById,
} = require("../services/room.service");
const {
  createComment,
  findCommentByRoomId,
} = require("../services/comment.service");

const { convertToUTC7 } = require("../utils/booking.utils");

const getAllRoom = async (req, res) => {
  var roomList = await findAllRoom();

  roomList = roomList.map((room) => {
    return {
      id: room.id,
      pictureLink: room.image,
      building: room.SelfStudyArea?.building,
      floor: room.SelfStudyArea?.floor,
      roomNumber: room.name,
      maxSeat: room.capacity,
      type: room.type,
      description: room.description,
    };
  });

  res.json({
    success: true,
    data: roomList,
  });
};

const getRoomDetailById = async (req, res) => {
  const roomId = req.params?.id;

  if (roomId == undefined) {
    return res.status(404).json({
      success: false,
      message: "Room Id can't empty",
    });
  }

  const roomDetail = await findRoomDetailById({ id: roomId });

  if (!roomDetail) {
    return res.status(404).json({
      success: false,
      message: "Can't fount any room with provided id",
    });
  }

  return res.json({
    success: true,
    data: {
      id: roomDetail.id,
      pictureLink: roomDetail.image,
      building: roomDetail.SelfStudyArea?.building,
      floor: roomDetail.SelfStudyArea?.floor,
      roomNumber: roomDetail.name,
      maxSeat: roomDetail.capacity,
      type: roomDetail.type,
      description: roomDetail.description,
    },
  });
};

const getRoomComment = async (req, res) => {
  const roomId = req.params?.id;

  if (!roomId) {
    return res.json({
      success: false,
      message: "RoomId can't empty",
    });
  }

  var commentList = await findCommentByRoomId({ roomId });
  commentList = await Promise.all(
    commentList.map(async (comment) => {
      const userId = comment.userId;
      await fetch(`http://localhost:8080/user/${userId}`)
        .then((response) => response.json())
        .then((data) => {
          /* Get full name of user from user service */
          if (data?.fullName) {
            comment.userName = data.fullName;
          }
        })
        .catch((error) => {
          console.log("Error when get user info");
        });

      return {
        userName: comment?.userName || "Anonymous",
        date: convertToUTC7(comment.createdAt),
        content: comment.content,
      };
    })
  );

  /* Sort comment by last comment first */
  commentList = commentList.sort((a, b) => {
    return new Date(b.date).getTime() - new Date(a.date).getTime();
  });

  res.json({
    success: true,
    data: commentList,
  });
};

const createRoomComment = async (req, res) => {
  const roomId = req.params?.id;

  if (!roomId) {
    return res.json({
      success: false,
      message: "RoomId can't empty",
    });
  }

  const room = await findRoomById({ id: roomId });

  if (!room) {
    return res.json({
      success: false,
      message: "Room not found",
    });
  }

  const userId = req.userId;
  const content = req.body?.content;

  try {
    const comment = await createComment({
      userId,
      roomId,
      content,
    });
    res.json({
      success: true,
      data: comment,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

module.exports = {
  getAllRoom,
  getRoomDetailById,
  getRoomComment,
  createRoomComment,
};
