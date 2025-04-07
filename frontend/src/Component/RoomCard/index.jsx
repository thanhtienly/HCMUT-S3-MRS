import styles from "./styles.scss";
import classNames from "classnames/bind";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import pictureRoom from "../../assets/pictureRoom.jpg";
const cx = classNames.bind(styles);
const typeTable = ["Tự học", "Học nhóm", "Mentoring"];
const building = ["H1", "H2", "H3", "H6"];
const stateRoom = ["Trống", "Đã đặt"];
function RoomCard({ data }) {
  const navigate = useNavigate();
  const handleOnClickPicture = () => {
    navigate(`roomDetail/${data.id}`);
  };
  return (
    <div
      key={data.id}
      className={cx(
        "container_roomCard col-xl-3 col-lg-6 col-md-6 col-sm-6 mb-4"
      )}
    >
      <div className={cx("wrapper_roomCard")} onClick={handleOnClickPicture}>
        <div className={cx("wrapper_image")}>
          <img className={cx("wrapper_image_room")} src={pictureRoom} alt="" />
        </div>
        <div className={cx("wrapper_content")}>
          <div className={cx("wrapper_title_room")}>
            <span className={cx("type_room")}>
              {" "}
              Phòng: {typeTable[data.type]}
            </span>
            <span className={cx("wrapper_maxSeat")}>
              Số chỗ tối đa: {data.maxSeat}
            </span>

            {/* <span className={cx("wrapper_seat")}>{data.currentSeat}</span> */}
          </div>
          <div className={cx("wrapper_building_floor")}>
            <span className={cx("inforRoom inforRoom_building")}>
              Tòa: {building[data.building]} -
            </span>

            <span className={cx("inforRoom inforRoom_floor")}>
              Tầng: {data.floor}
            </span>
          </div>
          <div className={cx("wrapper_roomNumber")}>
            <span className={cx("roomNumber")}>Phòng: {data.roomNumber} </span>
          </div>
          <div className={cx("wrapper_state")}>
            {" "}
            <div className={cx("wrapper_display_state")}>
              {/* <span className={cx("state_room")}> {stateRoom[data.state]}</span> */}
              <span className={cx("wrapper_description_title")}>Mô tả</span>:{" "}
              {data.description}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default RoomCard;
