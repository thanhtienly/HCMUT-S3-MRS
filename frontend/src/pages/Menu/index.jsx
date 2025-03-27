import styles from "./styles.scss";
import classNames from "classnames/bind";
import { useEffect, useState } from "react";
import SearchBar from "../../Component/SearchBar";
import dataRoomList from "./DataFake";
import { SearchIcon } from "../../Component/Icon/Icon";
import RoomCard from "../../Component/RoomCard";
import ReactPaginate from "react-paginate";
import imageClassroom from "../../assets/imageClassroom.jpg";

const cx = classNames.bind(styles);
/*
  type: 0 tu hoc, 1 nhom  ,2 memtoring
  state 0 trống, state 1 có người
*/
const typeTable = ["tự học", "học nhóm", "mentoring"];
const building = ["H1", "H2", "H3", "H6"];
const listBuilding = [
  {
    name: "Toà nhà H1",
    id: 0,
  },
  {
    name: "Toà nhà H2",
    id: 1,
  },
  {
    name: "Toà nhà H3",
    id: 2,
  },
  {
    name: "Toà nhà H6",
    id: 3,
  },
];
function Menu() {
  const [building, setBuiling] = useState(1);
  const [currentPage, setCurrentPage] = useState(0);
  const [dataRoom, setDataRoom] = useState(dataRoomList);
  const itemsPerPage = 8;
  useEffect(
    function () {
      let newDataRoom = dataRoomList.filter(
        (room) => room.building === building
      );
      setDataRoom(newDataRoom);
    },
    [building]
  );
  // Tính toán danh sách sản phẩm hiển thị
  const offset = currentPage * itemsPerPage;
  const currentItems = dataRoom.slice(offset, offset + itemsPerPage);

  // Xử lý khi đổi trang
  const handlePageClick = ({ selected }) => {
    setCurrentPage(selected);
  };
  return (
    // <div className={cx("container-fluid")}>
    <div
      className={cx("menu-container container_wrapper_menu")}
      style={{
        backgroundImage: `url(${imageClassroom})`,
        backgroundSize: "cover",
      }}
    >
      {/* Thanh tìm kiếm */}
      <nav className={cx("wrapper_navbar")}>
        <div className={cx("wrapper_search")}>
          <input
            className={cx("wrapper_search_inputComponent")}
            type="search"
            placeholder="Tìm kiếm phòng học..."
          />
          <button className={cx("wrapper_button_search")} type="submit">
            <SearchIcon className={cx("wrapper_iconSearch")} />
          </button>
        </div>
      </nav>

      <div className={cx("row mt-4")}>
        {/* Sidebar */}
        {/* <div className={cx("col-md-3")}>
          <a
            href="#"
            className={cx("list-group-item list-group-item-action active")}
          >
            Tòa nhà: H1
          </a>
          <a href="#" className={cx("list-group-item list-group-item-action")}>
            Tòa nhà: H2
          </a>
          <a href="#" className={cx("list-group-item list-group-item-action")}>
            Tòa nhà: H3
          </a>
          <a href="#" className={cx("list-group-item list-group-item-action")}>
            Tòa nhà: H4
          </a>
        </div> */}

        <div className={cx("col-md-2")}>
          <div className={cx("list-group")}>
            <div className={cx("wrapper_navBar_item_title")}>
              Danh sách các tòa
            </div>
          </div>

          <div className={cx("list-group")}>
            {listBuilding.map(function (item, index) {
              return (
                <div
                  key={index}
                  className={cx("wrapper_navBar_item", {
                    active_navBar: item.id === building,
                  })}
                  onClick={() => setBuiling(item.id)}
                >
                  {item.name}
                </div>
              );
            })}
          </div>
        </div>

        {/* Danh sách sản phẩm */}
        <div className={cx("col-md-10")}>
          <div className={cx("row")}>
            {/* {[...Array(8)].map((_, index) => (
              <div
                key={index}
                className={cx("col-lg-3 col-md-4 col-sm-6 mb-4")}
              >
                <div className={cx("card")}>
                  <img
                    src="https://via.placeholder.com/150"
                    className={cx("card-img-top")}
                    alt="Sản phẩm"
                  />
                  <div className={cx("card-body")}>
                    <h5 className={cx("card-title")}>Sản phẩm {index + 1}</h5>
                    <p className={cx("card-text")}>Giá: 100.000₫</p>
                    <button className={cx("btn btn-primary")}>Mua ngay</button>
                  </div>
                </div>
              </div>
            ))} */}
            {currentItems.map((data) => (
              <RoomCard data={data} />
            ))}
          </div>
        </div>
      </div>
      <ReactPaginate
        previousLabel={"Trang trước"}
        nextLabel={"Trang sau"}
        breakLabel={"..."}
        pageCount={Math.ceil(dataRoom.length / itemsPerPage)}
        marginPagesDisplayed={2}
        pageRangeDisplayed={3}
        onPageChange={handlePageClick}
        containerClassName={"pagination"}
        activeClassName={"active"}
      />
    </div>
  );
}
export default Menu;
// wrapper_navItem list-group-item list-group-item-action
