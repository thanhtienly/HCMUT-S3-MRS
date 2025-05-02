import classNames from "classnames/bind";
import React, { use, useEffect, useState } from "react";
import styles from "./BookingHistory.module.scss";
import { FaTrash, FaEye } from "react-icons/fa";
import ReactPaginate from "react-paginate";
import pictureRoom from "../../assets/pictureRoom.jpg";
import BookingHistoryChart from "../BookingHistoryChar/BookingHistoryChart";
const cx = classNames.bind(styles);
const bookings = [
  {
    id: "1",
    pictureLink: pictureRoom,
    building: "H1",
    floor: "Tầng 1",
    roomNumber: "100",
    maxSeat: 8,
    currentSeat: 1,
    type: 0,
    state: 1,
    description:
      "Phòng học hỗ trợ các thiết bị cơ bản như, đèn bàn, quạt, dây sạc, ổ điện ",
    historyTime: "2025-04-04T16:04:43",
  },
  {
    id: "2",
    pictureLink: pictureRoom,
    building: "H1",
    floor: "Tầng 1",
    roomNumber: "100",
    maxSeat: 8,
    currentSeat: 1,
    type: 0,
    state: 1,
    description:
      "Phòng học hỗ trợ các thiết bị cơ bản như, đèn bàn, quạt, dây sạc, ổ điện ",
    historyTime: "2025-04-04T16:04:43",
  },
  {
    id: "3",
    pictureLink: pictureRoom,
    building: "H1",
    floor: "Tầng 1",
    roomNumber: "100",
    maxSeat: 8,
    currentSeat: 1,
    type: 0,
    state: 1,
    description:
      "Phòng học hỗ trợ các thiết bị cơ bản như, đèn bàn, quạt, dây sạc, ổ điện ",
    historyTime: "2025-04-04T16:04:43",
  },
  {
    id: "4",
    pictureLink: pictureRoom,
    building: "H1",
    floor: "Tầng 1",
    roomNumber: "100",
    maxSeat: 8,
    currentSeat: 1,
    type: 0,
    state: 1,
    description:
      "Phòng học hỗ trợ các thiết bị cơ bản như, đèn bàn, quạt, dây sạc, ổ điện ",
    historyTime: "2025-04-04T16:04:43",
  },
  {
    id: "5",
    pictureLink: pictureRoom,
    building: "H1",
    floor: "Tầng 1",
    roomNumber: "100",
    maxSeat: 8,
    currentSeat: 1,
    type: 0,
    state: 1,
    description:
      "Phòng học hỗ trợ các thiết bị cơ bản như, đèn bàn, quạt, dây sạc, ổ điện ",
    historyTime: "2025-04-04T16:04:43",
  },
  {
    id: "6",
    pictureLink: pictureRoom,
    building: "H1",
    floor: "Tầng 1",
    roomNumber: "100",
    maxSeat: 8,
    currentSeat: 1,
    type: 0,
    state: 1,
    description:
      "Phòng học hỗ trợ các thiết bị cơ bản như, đèn bàn, quạt, dây sạc, ổ điện ",
    historyTime: "2025-04-04T16:04:43",
  },
  {
    id: "7",
    pictureLink: pictureRoom,
    building: "H1",
    floor: "Tầng 1",
    roomNumber: "100",
    maxSeat: 8,
    currentSeat: 1,
    type: 0,
    state: 1,
    description:
      "Phòng học hỗ trợ các thiết bị cơ bản như, đèn bàn, quạt, dây sạc, ổ điện ",
    historyTime: "2025-04-04T16:04:43",
  },
  {
    id: "8",
    pictureLink: pictureRoom,
    building: "H1",
    floor: "Tầng 1",
    roomNumber: "100",
    maxSeat: 8,
    currentSeat: 1,
    type: 0,
    state: 1,
    description:
      "Phòng học hỗ trợ các thiết bị cơ bản như, đèn bàn, quạt, dây sạc, ổ điện ",
    historyTime: "2025-04-04T16:04:43",
  },
  {
    id: "9",
    pictureLink: pictureRoom,
    building: "H1",
    floor: "Tầng 1",
    roomNumber: "100",
    maxSeat: 8,
    currentSeat: 1,
    type: 0,
    state: 1,
    description:
      "Phòng học hỗ trợ các thiết bị cơ bản như, đèn bàn, quạt, dây sạc, ổ điện ",
    historyTime: "2025-04-04T16:04:43",
  },
];

const BookingHistory = () => {
  const [history, setHistory] = useState([]);
  const [selectedBooking, setSelectedBooking] = useState(null);
  const [currentPage, setCurrentPage] = useState(0);
  const [historyBooking, setHistoryBooking] = useState([]);
  const [lengthBooking, setLengthBooking] = useState(0);
  const itemsPerPage = 4;
  const handlePageClick = ({ selected }) => {
    setCurrentPage(selected);
  };
  useEffect(() => {
    const offset = currentPage * itemsPerPage;
    const handleBooking = history.slice(offset, offset + itemsPerPage);
    setHistoryBooking(handleBooking);
  }, [currentPage, history]);
  const handleDelete = (id) => {
    setHistory(history.filter((booking) => booking.id !== id));
  };

  const handleViewDetails = (booking) => {
    setSelectedBooking(booking);
  };
  useEffect(() => {
    const idUser = localStorage.getItem("idUser");
    const url = "http://localhost:8000/booking/history";
    fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "user-id": idUser,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        setLengthBooking(data.data.length);
        setHistory(data.data);
      });
  }, []);
  return (
    <>
      <div className={styles.container}>
        <h2 className={styles.title}>Lịch sử đặt phòng</h2>
        <ul className={styles.list}>
          {historyBooking.map((booking) => (
            <li
              onClick={() => handleViewDetails(booking)}
              key={booking.id}
              className={styles.item}
            >
              <img src={pictureRoom} alt="Room" className={styles.image} />
              <div className={styles.info}>
                <p>
                  <strong>Toà nhà:</strong> {booking.building}
                </p>
                <p>
                  <strong>Tầng:</strong> {booking.floor}
                </p>
                <p>
                  <strong>Phòng:</strong> {booking.roomNumber}
                </p>
                <p>
                  <strong>Thời gian đặt:</strong>{" "}
                  {new Date(booking.historyTime).toLocaleString()}
                </p>
              </div>
              <div className={styles.actions}>
                {/* <button
                  className={styles.viewButton}
                  onClick={() => handleViewDetails(booking)}
                >
                  <FaEye />
                </button> */}
                <button
                  className={styles.deleteButton}
                  onClick={() => handleDelete(booking.id)}
                >
                  <FaTrash />
                </button>
              </div>
            </li>
          ))}
        </ul>

        {selectedBooking && (
          <div className={cx("wrapper_specifies_booking")}>
            <div className={cx("wrapper_child_booking")}>
              <h3 className={cx("wrapper_bookingHis_title")}>Chi tiết phòng</h3>
              <p>
                <strong>Toà nhà:</strong> {selectedBooking.building}
                <strong className={cx("wrapper_booking_floor")}>
                  Tầng:
                </strong>{" "}
                {selectedBooking.floor}
              </p>

              <p>
                <strong>Phòng:</strong> {selectedBooking.roomNumber}
              </p>
              <p>
                <strong>Số chỗ tối đa:</strong> {selectedBooking.maxSeat}
              </p>
              <p>
                <strong>Ngày:</strong> {selectedBooking.from.split("T")[0]}
              </p>
              <p>
                <strong>Thời gian bắt đầu:</strong>{" "}
                {selectedBooking.from.split("T")[1]}
              </p>
              <p>
                <strong>Thời gian kết thúc:</strong>{" "}
                {selectedBooking.to.split("T")[1]}
              </p>
              <p>
                <strong>Mô tả:</strong> {selectedBooking.description}
              </p>
              <p className={cx("wrapper_timeBooking")}>
                <strong>Thời gian đặt:</strong>{" "}
                {new Date(selectedBooking.historyTime).toLocaleString()}
              </p>
              <button
                className={styles.closeButton}
                onClick={() => setSelectedBooking(null)}
              >
                Đóng
              </button>
            </div>
          </div>
        )}
        <ReactPaginate
          previousLabel={"Trang trước"}
          nextLabel={"Trang sau"}
          breakLabel={"..."}
          pageCount={Math.ceil(lengthBooking / itemsPerPage)}
          marginPagesDisplayed={2}
          pageRangeDisplayed={3}
          onPageChange={handlePageClick}
          containerClassName={"pagination"}
          activeClassName={"active"}
        />
      </div>
    </>
  );
};

export default BookingHistory;
