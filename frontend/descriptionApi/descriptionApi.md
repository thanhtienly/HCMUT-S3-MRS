# Description Data and Api

## Convention

For convenience in database storage, there are some conventions as follows:
building: "H1" | "H2" | "H3" | "H6"
type: "Tự học" | "Học nhóm" | "Mentoring"

# Description Data

## Room ("Học nhóm" , "Mentoring")

room: {
id: "1",
pictureLink: "",
building: "H1",
floor: 1,
roomNumber: "100",
maxSeat: 8,
type: "Học nhóm",
description:
"Phòng học hỗ trợ các thiết bị cơ bản như, đèn bàn, quạt, dây sạc, ổ điện ",
orders: [
{
roomOwner: "Nguyễn Thùy Linh ",
startTime: "2025-04-25T10:30:00",
endTime: "2025-04-25T12:30:00",
keyInvite: "12345678",
currentSeat: 4,
},
{
roomOwner: "Nguyễn Thùy Linh ",
startTime: "2025-04-25T16:30:00",
endTime: "2025-04-25T17:30:00",
keyInvite: "12345678",
currentSeat: 2,
},
{
roomOwner: "Nguyễn Thùy Linh ",
startTime: "2025-04-25T14:30:00",
endTime: "2025-04-25T15:30:00",
keyInvite: "12345678",
currentSeat: 1,
},
{
roomOwner: "Nguyễn Ngọc Linh",
startTime: "2025-04-25T10:30:00",
endTime: "2025-04-25T12:30:00",
keyInvite: "12345678",
currentSeat: 2,
},
{
roomOwner: "Nguyễn Ngọc Linh",
startTime: "2025-04-25T16:30:00",
endTime: "2025-04-25T17:30:00",
keyInvite: "12345678",
currentSeat: 4,
},
{
roomOwner: "Nguyễn Ngọc Linh",
startTime: "2025-04-25T14:30:00",
endTime: "2025-04-25T15:30:00",
keyInvite: "12345678",
currentSeat: 2,
},
],
},

## Room ("Tự học")

room: {
id: "1",
pictureLink: "",
building: "H1",
floor: 1,
roomNumber: "100",
maxSeat: 8,
type: "Học nhóm",
description:
"Phòng học hỗ trợ các thiết bị cơ bản như, đèn bàn, quạt, dây sạc, ổ điện ",
orders: [
{
roomOwner: "Nguyễn Thùy Linh ",
startTime: "2025-04-25T10:30:00",
endTime: "2025-04-25T12:30:00",
},
{
roomOwner: "Nguyễn Thùy Linh ",
startTime: "2025-04-25T16:30:00",
endTime: "2025-04-25T17:30:00",
},
{
roomOwner: "Nguyễn Thùy Linh ",
startTime: "2025-04-25T14:30:00",
endTime: "2025-04-25T15:30:00",
},
],
},

# Description Api

## Api need

- 1. get add room (description: get list of all room system have)
     Data response [
     {
     id: "1",
     pictureLink: "",
     building: "H1",
     floor: 1,
     roomNumber: "100",
     maxSeat: 8,
     type: "Học nhóm",
     description:
     "Phòng học hỗ trợ các thiết bị cơ bản như, đèn bàn, quạt, dây sạc, ổ điện ",
     },
     {
     id: "2",
     pictureLink: "",
     building: "H1",
     floor: 1,
     roomNumber: "100",
     maxSeat: 8,
     type: "Học nhóm",
     description:
     "Phòng học hỗ trợ các thiết bị cơ bản như, đèn bàn, quạt, dây sạc, ổ điện ",
     },
     ]
- 2. get detail room id{i} (description: get detail room has id i)
     Data response
     {
     id: "2",
     pictureLink: "",
     building: "H1",
     floor: 1,
     roomNumber: "100",
     maxSeat: 8,
     type: "Học nhóm",
     description:
     "Phòng học hỗ trợ các thiết bị cơ bản như, đèn bàn, quạt, dây sạc, ổ điện ",
     }
- 3. find a list of booked timeslots by date
     example getListOrderTime07/04/2025
     Data response
     orders: [
     {
     roomOwner: "Nguyễn Thùy Linh ",
     startTime: "2025-04-25T10:30:00",
     endTime: "2025-04-25T12:30:00",
     keyInvite: "12345678",
     currentSeat: 4,
     },
     {
     roomOwner: "Nguyễn Thùy Linh ",
     startTime: "2025-04-25T16:30:00",
     endTime: "2025-04-25T17:30:00",
     keyInvite: "12345678",
     currentSeat: 2,
     },
     {
     roomOwner: "Nguyễn Thùy Linh ",
     startTime: "2025-04-25T14:30:00",
     endTime: "2025-04-25T15:30:00",
     keyInvite: "12345678",
     currentSeat: 1,
     },
     {
     roomOwner: "Nguyễn Ngọc Linh",
     startTime: "2025-04-25T10:30:00",
     endTime: "2025-04-25T12:30:00",
     keyInvite: "12345678",
     currentSeat: 2,
     },
     {
     roomOwner: "Nguyễn Ngọc Linh",
     startTime: "2025-04-25T16:30:00",
     endTime: "2025-04-25T17:30:00",
     keyInvite: "12345678",
     currentSeat: 4,
     },
     {
     roomOwner: "Nguyễn Ngọc Linh",
     startTime: "2025-04-25T14:30:00",
     endTime: "2025-04-25T15:30:00",
     keyInvite: "12345678",
     currentSeat: 2,
     },
     ]
- 4 check if the room is booked at that time
  Data reponse: true | false
- 5 save booking information
- 6 Get booking history information of user with id i
