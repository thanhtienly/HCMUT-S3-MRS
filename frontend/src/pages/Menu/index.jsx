import styles from "./styles.scss";
import classNames from "classnames/bind";
import { useEffect, useRef, useState } from "react";
import SearchBar from "../../Component/SearchBar";
import dataRoomListFake from "./DataFake";
import { IconMenu, MenuIcon, SearchIcon } from "../../Component/Icon/Icon";
import RoomCard from "../../Component/RoomCard";
import ReactPaginate from "react-paginate";
import imageClassroom from "../../assets/bku07.jpg";
import axios from "axios";
import NavSearchBar from "../../Component/NavSeachBar/NavSeachBar";
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
  const inputRef = useRef(null);
  const [inputLeft, setInputLeft] = useState(0);
  const [inputWidth, setInputWidth] = useState(0);

  const [typeRoom, setTypeRoom] = useState("Tự học");
  const [building, setBuilding] = useState("H1");
  const [currentPage, setCurrentPage] = useState(0);
  const [dataRoomList, setDataRoomList] = useState([]);
  const [dataRoom, setDataRoom] = useState(dataRoomListFake);
  const itemsPerPage = 8;
  const [searchQuery, setSearchQuery] = useState("");
  const [currentItems, setCurrentItems] = useState(
    dataRoomList.slice(0, 0 + itemsPerPage)
  );
  const [navSearch, setNavSearch] = useState(false);

  useEffect(() => {
    const updatePosition = () => {
      if (inputRef.current) {
        const rect = inputRef.current.getBoundingClientRect();
        setInputLeft(rect.left);
        setInputWidth(rect.width);
      }
    };

    updatePosition();
    window.addEventListener("resize", updatePosition);
    return () => window.removeEventListener("resize", updatePosition);
  }, []);

  useEffect(
    function () {
      let newDataRoom = dataRoomList.filter(
        (room) => room.building === building && room.type === typeRoom
      );
      setDataRoom(newDataRoom);
    },
    [building, typeRoom]
  );

  const fetchRoomData = async () => {
    try {
      const response = await axios.get("http://localhost:8000/room");

      setDataRoomList(response.data.data);
    } catch (error) {
      console.error("Error fetching branch data:", error);
    }
  };
  useEffect(() => {
    fetchRoomData();
  }, []);

  // Tính toán danh sách sản phẩm hiển thị

  // Xử lý khi đổi trang
  const handlePageClick = ({ selected }) => {
    setCurrentPage(selected);
    const offset = selected * itemsPerPage;

    setCurrentItems(dataRoom.slice(offset, offset + itemsPerPage));
  };

  useEffect(() => {
    const filters = parseSearchQuery(searchQuery);

    const listOfRoom = dataRoom.filter((room) => {
      if (filters.floor != undefined && room.floor != filters.floor)
        return false;
      if (
        filters.roomNumber != undefined &&
        room.roomNumber.slice(3) != filters.roomNumber
      )
        return false;
      if (filters.building != undefined && room.building != filters.building)
        return false;
      if (filters.maxSeat != undefined && room.maxSeat != filters.maxSeat)
        return false;
      if (filters.type != undefined && room.type != filters.type) return false;

      return true;
    });

    setCurrentItems(
      listOfRoom.slice(
        currentPage * itemsPerPage,
        currentPage * itemsPerPage + itemsPerPage
      )
    );
  }, [searchQuery, currentPage, dataRoom]);

  return (
    // <div className={cx("container-fluid")}>
    <div
      className={cx("menu-container container_wrapper_menu")}
      style={{
        backgroundImage: `url(${imageClassroom})`,
        backgroundSize: "cover",
        minHeight: "85vh",
      }}
    >
      {/* Thanh tìm kiếm */}
      <nav className={cx("wrapper_navbar")}>
        <div className={cx("wrapper_search")}>
          <input
            ref={inputRef}
            className={cx("wrapper_search_inputComponent")}
            type="search"
            placeholder="Tìm kiếm phòng học..."
            onChange={(e) => setSearchQuery(e.target.value)}
            onClick={() => setNavSearch(true)}
            onBlur={() => setNavSearch(false)}
            onFocus={() => setNavSearch(true)}
          />
          <button className={cx("wrapper_button_search")} type="submit">
            <SearchIcon className={cx("wrapper_iconSearch")} />
          </button>
          {navSearch && (
            <NavSearchBar
              currentItems={currentItems}
              left={inputLeft}
              width={inputWidth}
            />
          )}
          {/* <NavSearchBar
            currentItems={currentItems}
            left={inputLeft}
            width={inputWidth}
          /> */}
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
                    active_navBar: item.name === typeRoom,
                  })}
                  onClick={() => setTypeRoom(item.name)}
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
