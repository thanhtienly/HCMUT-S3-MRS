const { findAllRoom, findRoomDetailById } = require("../services/room.service");

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

  console.log(roomId);

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

module.exports = { getAllRoom, getRoomDetailById };
