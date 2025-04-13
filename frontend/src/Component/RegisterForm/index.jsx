import styles from "./styles.scss";
import classNames from "classnames/bind";
import { Icon } from "lucide-react";
import { useEffect, useState } from "react";
import { FailIcon, IconClose } from "../Icon/Icon";
import DataFake from "../../pages/Menu/DataFake";
import { useNavigate } from "react-router-dom";
import ReactPaginate from "react-paginate";
const cx = classNames.bind(styles);
const DataTemporary = DataFake[0];
const TimeResigter = DataTemporary.orders;

function RegisterForm({ onClickCloseRegisterForm, roomId, typeOfRoom }) {
  const navigate = useNavigate();
  const [date, setDate] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [password, setPassword] = useState(null);
  const [confirmPassword, setConfirmPassword] = useState(null);
  const [messageRegister, setMessageRegister] = useState({ msg: "", id: 0 });
  const [orderTime, setOrderTime] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);

  const itemsPerPage = 3;
  const [currentOrderTime, setCurrentOrderTime] = useState([]);
  const [joinRoom, setJoinRoom] = useState(false);
  const [passwordJoin, setPasswordJoin] = useState("");
  // const offset = currentPage * itemsPerPage;
  // const currenOrderTime = orderTime.slice(offset, offset + itemsPerPage);
  const totalPages = Math.ceil(orderTime.length / itemsPerPage);
  const triggerError = (msg) => {
    setMessageRegister({ msg, id: Date.now() });
  };
  const handleOnclickJoinRoom = (reservationId, secret) => {
    const url = "http://localhost:8000/booking/join";
    const payload = {
      reservationId,
      secret,
    };
    fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });
  };

  useEffect(() => {
    fetch(
      `http://localhost:8000/booking/time-slot?date=${date}&roomId=${roomId}`
    )
      .then((response) => response.json())
      .then((data) => {
        const state = data.success;
        // console.log(roomId);
        // console.log(data.data);

        if (state && data.data !== undefined) {
          setOrderTime(data.data.length !== 0 ? data.data : []);
          setCurrentOrderTime(
            data.data.length !== 0 ? data.data.slice(0, 0 + itemsPerPage) : []
          );
        } else if (data.data === undefined) {
          setOrderTime([]);
          setCurrentOrderTime([]);
        }
      });
  }, [date, roomId]);
  // const handleValidRegisterForm = () => {
  //   return false;
  // };
  const handlePageClick = ({ selected }) => {
    setCurrentPage(selected);
    const offset = selected * itemsPerPage;
    setCurrentOrderTime(orderTime.slice(offset, offset + itemsPerPage));
  };
  const handleOnClickRoomRegister = (e) => {
    // if (handleValidRegisterForm()) {
    //   e.preventDefault();
    //   navigate("/register/successful");
    // } else {
    //   e.preventDefault();
    //   setMessageRegister(true);
    //   // setMessageRegister(false);
    // }
    const idUser = localStorage.getItem("idUser");
    console.log("idUser");
    console.log(idUser);
    e.preventDefault();
    if (idUser === null) {
      e.preventDefault();
      navigate("/signin");
    } else {
      const bookTimeSlot = async () => {
        const payload = {
          date: date,
          roomId: roomId,
          from: startTime,
          to: endTime,
          secret: confirmPassword, //
        };

        try {
          const response = await fetch(
            "http://localhost:8000/booking/time-slot",
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
                "user-id": idUser,
              },
              body: JSON.stringify(payload),
            }
          );

          const result = await response.json();

          const isReserved = "The room have been reserved";
          if (result.message === isReserved) {
            console.log("room has been reserved");
            e.preventDefault();
            triggerError("reserved");
          } else if (result.success) {
            e.preventDefault();
            navigate("/register/successful");
          }
        } catch (error) {
          console.error("⚠️ Lỗi mạng hoặc không kết nối được:", error);
        }
      };
      bookTimeSlot();
    }
  };

  const handleOnClickJoinRoom = () => {
    setJoinRoom(true);
    // onClickCloseRegisterForm();

    // navigate("/register/successful");
  };
  return (
    <>
      <div className={cx("wrapper")}>
        <div className={cx("wrapper_container")}>
          <div className={cx("wrapper_header")}>
            <h2 className={cx("wrapper_header_title")}>Đặt Phòng</h2>
            <div
              className={cx("wrapper_header_close")}
              onClick={onClickCloseRegisterForm}
            >
              <IconClose />
            </div>
          </div>
          <form class="booking-form">
            <div class={cx("form-group")}>
              <label for="booking-date">Chọn ngày đặt phòng:</label>
              <input
                type="date"
                id="booking-date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                required
              />
            </div>

            <div class={cx("form-group")}>
              <label for="start-time">Giờ bắt đầu:</label>
              <input
                type="time"
                id="start-time"
                value={startTime}
                onChange={(e) => setStartTime(e.target.value)}
                required
              />
            </div>

            <div class={cx("form-group")}>
              <label for="end-time">Giờ kết thúc:</label>
              <input
                type="time"
                id="end-time"
                value={endTime}
                onChange={(e) => setEndTime(e.target.value)}
                required
              />
            </div>
            <div className={cx("form-group")}>
              <label htmlFor="password">Tạo mã mời</label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            <div className={cx("form-group")}>
              <label htmlFor="confirmPassword">Xác nhận</label>
              <input
                type="password"
                id="confirmPassword"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
            </div>

            <button
              type="submit"
              class="btn-submit"
              onClick={handleOnClickRoomRegister}
            >
              Đặt phòng
            </button>
            <div class={cx("reserved-times")}>
              <h3>Danh sách giờ Đã Được Đặt</h3>
              <ul id={cx("reserved-list")}>
                {currentOrderTime.map((order, index) => (
                  <li className={cx("wrapper_time_room")} key={index}>
                    {order.startTime.split("T")[1].slice(0, 5)} -{" "}
                    {order.endTime.split("T")[1].slice(0, 5)}
                    {typeOfRoom !== "Tự học" && (
                      <>
                        <span className={cx("wrapper_currentSeat_room")}>
                          Số chỗ:
                          <span
                            className={cx("wrapper_currentSeat_roomDetail")}
                          >
                            {" "}
                            {order.currentSeat}
                          </span>
                          |
                          <span className={cx("wrapper_maxSeat_roomDetail")}>
                            {order.maxSeat}
                          </span>
                        </span>
                        <span
                          onClick={handleOnClickJoinRoom}
                          className={cx("wrapper_join_room")}
                        >
                          {" "}
                          Tham gia{" "}
                        </span>
                      </>
                    )}
                  </li>
                ))}
              </ul>
              <ReactPaginate
                previousLabel={"Trang trước"}
                nextLabel={"Trang sau"}
                breakLabel={"..."}
                pageCount={totalPages}
                marginPagesDisplayed={2}
                pageRangeDisplayed={3}
                onPageChange={handlePageClick}
                containerClassName={"pagination"}
                activeClassName={"active"}
              />
            </div>
          </form>
        </div>
        {messageRegister.msg && (
          <div className={cx("wrapper_message_register")}>
            <div>
              <FailIcon />
              Phòng đã có người đặt{" "}
            </div>
          </div>
        )}
      </div>

      {joinRoom && (
        <div className={cx("wrapper_joinRoom_container")}>
          <div className={cx("wrapper_joinRoom")}>
            <div
              className={cx("wrapper_header_close_join")}
              onClick={() => setJoinRoom(false)}
            >
              <IconClose />
            </div>
            <h3 className={cx("wrapper_joinRoom_title")}>
              Chủ phòng: Nguyễn Thùy Linh
            </h3>
            <div>
              <label htmlFor="passwordJoin">Nhập mã tham gia</label>
              <input
                type="password"
                id="passwordJoin"
                value={passwordJoin}
                onChange={(e) => setPasswordJoin(e.target.value)}
                className={cx("wrapper_joinRoom_password")}
              />
            </div>
            <div className={cx("wrapper_button_joinRoom")}>
              <button className={cx("joinRoom_button")}> Tham gia</button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
export default RegisterForm;
