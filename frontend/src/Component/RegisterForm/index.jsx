import styles from "./styles.scss";
import classNames from "classnames/bind";
import { Icon } from "lucide-react";
import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import { FailIcon, IconClose } from "../Icon/Icon";
import DataFake from "../../pages/Menu/DataFake";
import { useNavigate } from "react-router-dom";
import ReactPaginate from "react-paginate";
import * as Yup from "yup";
import ErrorNotification from "../../ErrorNotification";
import { yupResolver } from "@hookform/resolvers/yup";

const cx = classNames.bind(styles);
const DataTemporary = DataFake[0];
const TimeResigter = DataTemporary.orders;
const BookingSchema = Yup.object().shape({
  date: Yup.string()
    .required("Vui lòng chọn ngày đặt phòng")
    .test("is-future", "Ngày đặt phòng phải từ hôm nay trở đi", (value) => {
      if (!value) return false;
      const selectedDate = new Date(value);
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      return selectedDate >= today;
    }),

  startTime: Yup.string()
    .required("Vui lòng chọn giờ bắt đầu")
    .test(
      "is-in-range",
      "Giờ bắt đầu phải trong khoảng 07:00 đến 21:00",
      (value) => {
        if (!value) return false;
        const [hour, minute] = value.split(":").map(Number);
        const totalMinutes = hour * 60 + minute;
        return totalMinutes >= 7 * 60 && totalMinutes <= 21 * 60;
      }
    ),

  endTime: Yup.string()
    .required("Vui lòng chọn giờ kết thúc")
    .test(
      "is-after-start",
      "Giờ kết thúc phải sau giờ bắt đầu",
      function (value) {
        const { startTime } = this.parent;
        return startTime && value && startTime < value;
      }
    )
    .test(
      "is-in-range",
      "Giờ kết thúc phải trong khoảng 07:00 đến 21:00",
      (value) => {
        if (!value) return false;
        const [hour, minute] = value.split(":").map(Number);
        const totalMinutes = hour * 60 + minute;
        return totalMinutes >= 7 * 60 && totalMinutes <= 21 * 60;
      }
    ),

  password: Yup.string()
    .required("Vui lòng nhập mã mời")
    .min(6, "Mã mời phải có ít nhất 6 ký tự"),

  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password")], "Xác nhận không khớp")
    .required("Vui lòng xác nhận mã mời"),
});

function RegisterForm({ onClickCloseRegisterForm, roomId, typeOfRoom }) {
  const navigate = useNavigate();
  const [messageError, setMessageError] = useState("");
  const [date, setDate] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [password, setPassword] = useState(null);
  const [confirmPassword, setConfirmPassword] = useState(null);
  const [messageRegister, setMessageRegister] = useState(false);
  const [orderTime, setOrderTime] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);

  const itemsPerPage = 3;
  const [currentOrderTime, setCurrentOrderTime] = useState([]);
  const [joinRoom, setJoinRoom] = useState(false);
  const [passwordJoin, setPasswordJoin] = useState("");
  // const offset = currentPage * itemsPerPage;
  // const currenOrderTime = orderTime.slice(offset, offset + itemsPerPage);
  const totalPages = Math.ceil(orderTime.length / itemsPerPage);
  // const triggerError = (msg) => {
  //   setMessageRegister({ msg, id: Date.now() });
  // };
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(BookingSchema),
  });
  const handleOnclickJoinRoom = ({ e, reservationId }) => {
    e.preventDefault();
    const url = "http://localhost:8000/booking/join";
    const payload = {
      reservationId,
      secret: passwordJoin,
    };
    const idUser = localStorage.getItem("idUser");
    // e.preventDefault();
    if (idUser === null) {
      // e.preventDefault();
      navigate("/signin");
    } else {
      fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "user-id": idUser,
        },
        body: JSON.stringify(payload),
      })
        .then((response) => response.json())
        .then((data) => {
          if (data.success) {
            navigate("/register/successful");
          } else {
            let message = "";
            const dataMessage = data.message;
            console.log(dataMessage);
            if (dataMessage == "The room's full") {
              message = "Phòng học đã đủ số lượng";
            } else if (dataMessage == "Invalid secret") {
              message = "Mã tham gia không chính xác";
            } else {
              message = "Bạn đã tham gia phòng học này";
            }
            setMessageError(message);
            setMessageRegister(true);
            setTimeout(() => {
              setMessageRegister(false);
            }, 2000);
          }
        });
    }
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
    const idUser = localStorage.getItem("idUser");
    // e.preventDefault();
    if (idUser === null) {
      // e.preventDefault();
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
          await BookingSchema.validate(
            { date, startTime, endTime, password, confirmPassword },
            { abortEarly: false }
          );

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
          // console.log("result.message");
          // console.log(result.message);

          const isReserved = "Overlap time slot";
          if (result.message == isReserved) {
            // e.preventDefault();
            setMessageError("Khoảng thời gian đã có người đặt");
            setMessageRegister(true);
            setTimeout(() => {
              setMessageRegister(false);
            }, 2000);
          } else if (result.success) {
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
          <form
            class="booking-form"
            onSubmit={(e) => {
              e.preventDefault();
              handleSubmit(() => handleOnClickRoomRegister())();
            }}
          >
            <div class={cx("form-group")}>
              <label for="booking-date">Chọn ngày đặt phòng:</label>
              <input
                {...register("date")}
                type="date"
                id="booking-date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                required
              />
              {errors.date && (
                <p className="errorFormValidator_css">{errors.date.message}</p>
              )}
            </div>

            <div class={cx("form-group")}>
              <label for="start-time">Giờ bắt đầu:</label>
              <input
                {...register("startTime")}
                type="time"
                id="start-time"
                value={startTime}
                onChange={(e) => setStartTime(e.target.value)}
                required
              />
              {errors.startTime && (
                <p className="errorFormValidator_css">
                  {errors.startTime.message}
                </p>
              )}
            </div>

            <div class={cx("form-group")}>
              <label for="end-time">Giờ kết thúc:</label>
              <input
                {...register("endTime")}
                type="time"
                id="end-time"
                value={endTime}
                onChange={(e) => setEndTime(e.target.value)}
                required
              />
              {errors.endTime && (
                <p className="errorFormValidator_css">
                  {errors.endTime.message}
                </p>
              )}
            </div>
            <div className={cx("form-group")}>
              <label htmlFor="password">Tạo mã mời</label>
              <input
                {...register("password")}
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              {errors.password && (
                <p className="errorFormValidator_css">
                  {errors.password.message}
                </p>
              )}
            </div>

            <div className={cx("form-group")}>
              <label htmlFor="confirmPassword">Xác nhận</label>
              <input
                {...register("confirmPassword")}
                type="password"
                id="confirmPassword"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
              {errors.confirmPassword && (
                <p className="errorFormValidator_css">
                  {errors.confirmPassword.message}
                </p>
              )}
            </div>

            <button
              type="submit"
              class="btn-submit"
              // onClick={handleOnClickRoomRegister}
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
                    {joinRoom && (
                      <div className={cx("wrapper_joinRoom_container")}>
                        <div className={cx("wrapper_joinRoom")}>
                          <div
                            className={cx("wrapper_header_close_join")}
                            onClick={() => setJoinRoom(false)}
                          >
                            <IconClose />
                          </div>
                          <h3 className={cx("wrapper_joinRoom_title_register")}>
                            Chủ phòng: Huỳnh Ngọc Thạch
                          </h3>
                          <div>
                            <label htmlFor="passwordJoin">
                              Nhập mã tham gia
                            </label>
                            <input
                              type="password"
                              id="passwordJoin"
                              value={passwordJoin}
                              onChange={(e) => setPasswordJoin(e.target.value)}
                              className={cx("wrapper_joinRoom_password")}
                            />
                          </div>
                          <div className={cx("wrapper_button_joinRoom")}>
                            <button
                              className={cx("joinRoom_button")}
                              onClick={(e) =>
                                handleOnclickJoinRoom({
                                  e: e,
                                  reservationId: order.reservationId,
                                })
                              }
                            >
                              {" "}
                              Tham gia
                            </button>
                          </div>
                        </div>
                      </div>
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

        {/* messageRegister.msg  */}
        {messageRegister && (
          <div className={cx("wrapper_message_register")}>
            <ErrorNotification message={messageError} />
          </div>
        )}
      </div>

      {/* {joinRoom && (
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
              <button
                className={cx("joinRoom_button")}
                onClick={(e) => handleOnclickJoinRoom(e)}
              >
                {" "}
                Tham gia
              </button>
            </div>
          </div>
        </div>
      )} */}
    </>
  );
}
export default RegisterForm;
