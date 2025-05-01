import styles from "./NavSearchBar.module.scss";
import classNames from "classnames/bind";
import pictureRoom from "../../assets/pictureRoom.jpg";
import { useNavigate } from "react-router-dom";
const cx = classNames.bind(styles);
function NavSearchBar({ currentItems, left, width }) {
  const navigate = useNavigate();

  return (
    <div
      className={cx("wrapper_search_list")}
      style={{
        position: "absolute",
        left: `${left - 40}px`,
        top: "100%", // nằm dưới input
        width: `${width}px`,
      }}
    >
      <ul className={cx("search_list")}>
        {currentItems.map((item) => (
          <li
            key={item.id}
            className={cx("wrapper_item")}
            // onClick={() => navigate(`roomDetail/${item.id}`)}
            onMouseDown={() => navigate(`roomDetail/${item.id}`)}
          >
            <div className={cx("item")}>
              <img className={cx("image")} src={pictureRoom} alt="" />
              <span className={cx("floor")}>Tầng: {item.floor} </span>
              <span className={cx("roomNumber")}>
                {" "}
                Phòng : {item.roomNumber}{" "}
              </span>
              <span className={cx("type")}> Loại phòng:{item.type} </span>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
export default NavSearchBar;
