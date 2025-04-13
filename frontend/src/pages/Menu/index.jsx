import styles from "./styles.scss";
import classNames from "classnames/bind";
import { useEffect, useState } from "react";
import SearchBar from "../../Component/SearchBar";
import dataRoomListFake from "./DataFake";
import { IconMenu, MenuIcon, SearchIcon } from "../../Component/Icon/Icon";
import RoomCard from "../../Component/RoomCard";
import ReactPaginate from "react-paginate";
import imageClassroom from "../../assets/bku07.jpg";
import axios from "axios";
const cx = classNames.bind(styles);
/*
  type: 0 tu hoc, 1 nhom  ,2 memtoring
  state 0 trống, state 1 có người
*/
function removeVietnameseTones(str) {
  return str
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "") // bỏ dấu
    .replace(/đ/g, "d")
    .replace(/Đ/g, "D");
}

function parseSearchQuery(query) {
  const result = {};
  const normalized = removeVietnameseTones(query.toLowerCase());

  // Tầng
  const floorMatch = normalized.match(/tang\s*:?\s*(\d+)/);
  if (floorMatch) result.floor = parseInt(floorMatch[1]);

  // Phòng
  const roomMatch = normalized.match(/phong\s*:?\s*(\d+)/);
  if (roomMatch) result.roomNumber = roomMatch[1];

  // Tòa
  const buildingMatch = normalized.match(/toa\s*:?\s*(\d+)/);
  if (buildingMatch) result.building = parseInt(buildingMatch[1]);

  // Ghế hoặc sức chứa
  const seatMatch = normalized.match(/(ghe|suc chua)\s*:?\s*(\d+)/);
  if (seatMatch) result.maxSeat = parseInt(seatMatch[2] || seatMatch[1]);

  // Loại
  const typeMatch = normalized.match(/loai\s*:?\s*(\d+)/);
  if (typeMatch) result.type = parseInt(typeMatch[1]);

  return result;
}

const typeTable = ["Tự học", "Học nhóm", "Mentoring"];
const building = ["H1", "H2", "H3", "H6"];
const listTypeTable = [
  {
    name: "Tự học",
    id: 0,
  },
  {
    name: "Học nhóm",
    id: 1,
  },
  {
    name: "Mentoring",
    id: 2,
  },
];
const listBuilding = [
  {
    name: "Toà nhà H1",
    id: "H1",
  },
  {
    name: "Toà nhà H2",
    id: "H2",
  },
  {
    name: "Toà nhà H3",
    id: "H3",
  },
  {
    name: "Toà nhà H6",
    id: "H6",
  },
];
function Menu() {
  const [typeRoom, setTypeRoom] = useState(0);
  const [building, setBuilding] = useState("H1");
  const [currentPage, setCurrentPage] = useState(0);
  const [dataRoomList, setDataRoomList] = useState([]);
  const [dataRoom, setDataRoom] = useState(dataRoomListFake);
  const itemsPerPage = 8;
  const [searchQuerry, setSearchQuerry] = useState("");
  const [currentItems, setCurrentItems] = useState(
    dataRoomList.slice(0, 0 + itemsPerPage)
  );

  useEffect(
    function () {
      let newDataRoom = dataRoomList.filter(
        (room) => room.building === building
      );
      setDataRoom(newDataRoom);
    },
    [building]
  );
  useEffect(
    function () {
      let newDataRoom = dataRoomList.filter((room) => room.type === typeRoom);
      setDataRoom(newDataRoom);
    },
    [typeRoom]
  );

  // Get data

  const fetchRoomData = async () => {
    try {
      const response = await axios.get("http://localhost:8000/room");

      setDataRoomList(response.data.data);
      // console.log(response.data.data);
    } catch (error) {
      console.error("Error fetching branch data:", error);
    }
  };
  useEffect(() => {
    fetchRoomData();
  }, []);
  // useEffect(() => {
  //   const url = "http://localhost:8000/room";
  //   fetch(url, {
  //     method: "GET",
  //     headers: {
  //       "Content-Type": "application/json",
  //       Accept: "application/json",
  //     },
  //   })
  //     .then((response) => response.json())
  //     .then((data) => setDataRoomList(data));
  // }, []);

  // Tính toán danh sách sản phẩm hiển thị

  // Xử lý khi đổi trang
  const handlePageClick = ({ selected }) => {
    setCurrentPage(selected);
    const offset = selected * itemsPerPage;

    setCurrentItems(dataRoom.slice(offset, offset + itemsPerPage));
  };
  // useEffect(() => {
  //   let listOfRoom = dataRoom.filter((room) => {
  //     return room.name.toLowerCase().includes(searchQuerry.toLowerCase());
  //   });
  //   setCurrentItems(
  //     listOfRoom.slice(
  //       currentPage * itemsPerPage,
  //       currentPage * itemsPerPage + itemsPerPage
  //     )
  //   );
  // }, [searchQuerry]);
  // useEffect(() => {
  //   const query = searchQuerry.toLowerCase().trim();

  //   const listOfRoom = dataRoom.filter((room) => {
  //     // Chuyển tất cả các giá trị về string để so sánh
  //     return (
  //       room.building.toString().toLowerCase().includes(query) ||
  //       room.floor.toString().toLowerCase().includes(query) ||
  //       room.roomNumber.toString().toLowerCase().includes(query) ||
  //       room.maxSeat.toString().toLowerCase().includes(query) ||
  //       room.type.toString().toLowerCase().includes(query)
  //     );
  //   });

  //   setCurrentItems(
  //     listOfRoom.slice(
  //       currentPage * itemsPerPage,
  //       currentPage * itemsPerPage + itemsPerPage
  //     )
  //   );
  // }, [searchQuerry, currentPage, dataRoom]);
  useEffect(() => {
    const filters = parseSearchQuery(searchQuerry);

    const listOfRoom = dataRoom.filter((room) => {
      // Kiểm tra từng trường nếu có trong filters
      if (filters.floor !== undefined && room.floor !== filters.floor)
        return false;
      if (
        filters.roomNumber !== undefined &&
        room.roomNumber !== filters.roomNumber
      )
        return false;
      if (filters.building !== undefined && room.building !== filters.building)
        return false;
      if (filters.maxSeat !== undefined && room.maxSeat !== filters.maxSeat)
        return false;
      if (filters.type !== undefined && room.type !== filters.type)
        return false;

      return true;
    });

    setCurrentItems(
      listOfRoom.slice(
        currentPage * itemsPerPage,
        currentPage * itemsPerPage + itemsPerPage
      )
    );
  }, [searchQuerry, currentPage, dataRoom]);

  return (
    // <div className={cx("container-fluid")}>
    <div
      className={cx("menu-container container_wrapper_menu")}
      style={{
        backgroundImage: `url(${imageClassroom})`,
        backgroundSize: "cover",
        minHeight: "100vh",
      }}
    >
      {/* Thanh tìm kiếm */}
      <nav className={cx("wrapper_navbar")}>
        <div className={cx("wrapper_search")}>
          <input
            className={cx("wrapper_search_inputComponent")}
            type="search"
            placeholder="Tìm kiếm phòng học..."
            onChange={(e) => setSearchQuerry(e.target.value)}
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
              <IconMenu />
              <span className={cx("wrapper_title_menu")}>
                Danh sách các tòa{" "}
              </span>
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
                  onClick={() => setBuilding(item.id)}
                >
                  {item.name}
                </div>
              );
            })}
          </div>

          <div className={cx("list-group")}>
            <div className={cx("wrapper_navBar_item_title")}>
              <IconMenu />
              <span className={cx("wrapper_title_menu")}>Loại phòng học</span>
            </div>
          </div>

          <div className={cx("list-group")}>
            {listTypeTable.map(function (item, index) {
              return (
                <div
                  key={index}
                  className={cx("wrapper_navBar_item", {
                    active_navBar: item.id === typeRoom,
                  })}
                  onClick={() => setTypeRoom(item.id)}
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
