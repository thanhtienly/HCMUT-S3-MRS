import styles from "./styles.scss";
import classNames from "classnames/bind";
import { Icon } from "lucide-react";
import { useState } from "react";
import { IconClose } from "../Icon/Icon";

import { useNavigate } from "react-router-dom";
const cx = classNames.bind(styles);
const TimeResigter = [
  { id: 1, startTime: "08:00", endTime: "09:30" },
  { id: 2, startTime: "10:00", endTime: "12:30" },
  { id: 3, startTime: "18:00", endTime: "19:30" },
];
function RegisterForm({ onClickCloseRegisterForm }) {
  const navigate = useNavigate();
  const [date, setDate] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const handleOnClickRoomRegister = (e) => {
    e.preventDefault();
    navigate("/register/successful");
  };
  return (
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
              {TimeResigter.map((time) => (
                <li key={time.id}>
                  {time.startTime} - {time.endTime}
                </li>
              ))}
            </ul>
          </div>
        </form>
      </div>
    </div>
  );
}
export default RegisterForm;
