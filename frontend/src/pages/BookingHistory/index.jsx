import classNames from "classnames/bind";
import React, { useState } from "react";
import styles from "./BookingHistory.module.scss";
import { FaTrash, FaEye } from "react-icons/fa";
import ReactPaginate from "react-paginate";
import pictureRoom from "../../assets/pictureRoom.jpg";
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
  const [history, setHistory] = useState(bookings);
  const [selectedBooking, setSelectedBooking] = useState(null);
  const [currentPage, setCurrentPage] = useState(0);
  const itemsPerPage = 4;
  const offset = currentPage * itemsPerPage;
  const currentItems = history.slice(offset, offset + itemsPerPage);
  const handlePageClick = ({ selected }) => {
    setCurrentPage(selected);
  };
  const handleDelete = (id) => {
    setHistory(history.filter((booking) => booking.id !== id));
  };

  const handleViewDetails = (booking) => {
    setSelectedBooking(booking);
  };

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Lịch sử đặt phòng</h2>
      <ul className={styles.list}>
        {currentItems.map((booking) => (
          <li
            onClick={() => handleViewDetails(booking)}
            key={booking.id}
            className={styles.item}
          >
            <img
              src={booking.pictureLink}
              alt="Room"
              className={styles.image}
            />
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
        <div className={styles.modal}>
          <div className={styles.modalContent}>
            <h3>Chi tiết phòng</h3>
            <p>
              <strong>Toà nhà:</strong> {selectedBooking.building}
            </p>
            <p>
              <strong>Tầng:</strong> {selectedBooking.floor}
            </p>
            <p>
              <strong>Phòng:</strong> {selectedBooking.roomNumber}
            </p>
            <p>
              <strong>Số chỗ tối đa:</strong> {selectedBooking.maxSeat}
            </p>
            <p>
              <strong>Số chỗ hiện tại:</strong> {selectedBooking.currentSeat}
            </p>
            <p>
              <strong>Mô tả:</strong> {selectedBooking.description}
            </p>
            <p>
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
        pageCount={Math.ceil(bookings.length / itemsPerPage)}
        marginPagesDisplayed={2}
        pageRangeDisplayed={3}
        onPageChange={handlePageClick}
        containerClassName={"pagination"}
        activeClassName={"active"}
      />
    </div>
  );
};

export default BookingHistory;
