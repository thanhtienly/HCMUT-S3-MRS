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

- 1. get all room (description: get list of all room system have)
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
     roomOwner: "1234",
     startTime: "2025-04-25T10:30:00",
     endTime: "2025-04-25T12:30:00",
     keyInvite: "12345678",
     currentSeat: 4,
     listIdUser: [
     "123",
     "456",
     "789"
     ]
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

## Api need version 2

1)add field members in book time slot
{
"Name": "Book a Time Slot",
"Endpoint": "http://localhost:8000/booking/time-slot",
"Request": {
"method": "POST",
"headers": {
"user-id": ""
},
"body": {
"date": "YYYY-MM-DD",
"roomId": "",
"from": "hh:mm",
"to": "hh:mm",
"secret": "Optional",
"members":["22131ascas73","22131ascas11","1asd23456"]

}
},
"ResponseBody": {
"success": "boolean",
"data": {
"id": "",
"roomId": "",
"userId": "",
"from": "2025-04-18T07:30",
"to": "2025-04-18T07:49",
"reservedAt": "2025-04-13T02:15",
"state": "Booked"
}
}
},

2. add field members List booking history, add future kick member in a room
   {
   "Name": "List booking history API (Student Only)",
   "Endpoint": "http://localhost:8000/booking/history",
   "Request": {
   "method": "GET",
   "headers": {
   "user-id": ""
   }
   },
   "ResponseBody": {
   "success": "boolean",
   "data": [
   {
   "id": "1",
   "roomId": "1",
   "building": "H6",
   "floor": "1",
   "roomNumber": "H6-101",
   "description": "Phòng học hỗ trợ các thiết bị cơ bản như, đèn bàn, quạt, dây sạc, ổ điện",
   "maxSeat": 4,
   "from": "2025-04-14T07:30",
   "to": "2025-04-14T07:49",
   "historyTime": "2025-04-13T02:09",
   "members":["2213b234das173","22sada13111","asdasd"]
   "currentSeat": 1
   }
   ]
   }
   },

3) Returns top 5 most booked rooms ever
   {
   [
   {
   "quantity":10,
   "roomNumber": "H6-101"
   },
   {
   "quantity":4,
   "roomNumber": "H6-102"
   },
   {
   "quantity":2,
   "roomNumber": "H6-103"
   },
   ]
   }
4) Returns the 5 most booked classrooms within 1 month from the current time
   {
   [
   {
   "quantity":2,
   "roomNumber": "H6-101"
   },
   {
   "quantity":1,
   "roomNumber": "H6-102"
   },
   {
   "quantity":1,
   "roomNumber": "H6-103"
   },
   ]
   }
