import React, { useState, useEffect, useContext } from "react";
import { useParams } from "react-router";
import Skeleton from "react-loading-skeleton";
import { NavLink } from "react-router-dom";
import { MoveLeft, Star } from "lucide-react";
import "./styles.scss";
import "react-loading-skeleton/dist/skeleton.css";
// import { CartContext } from "../../context/CartContext";
import { ThumbsUp, ThumbsDown, Reply } from "lucide-react";
import DataFake from "../../pages/Menu/DataFake.jsx";
import pictureRoom from "../../assets/pictureRoom.jpg";
import RegisterForm from "../RegisterForm/index.jsx";
import { useNavigate } from "react-router-dom";
// import pictureImage from "../../DataStore/Picture";
const typeTable = ["Tự học", "Học nhóm", "Mentoring"];
const building = ["H1", "H2", "H3", "H6"];
const stateRoom = ["Trống", "Đã đặt"];
const roomDetailFake = DataFake[0];
console.log(roomDetailFake);
function Product() {
  // const { id } = useParams();
  const navigate = useNavigate();
  const [roomDetail, setRoomDetail] = useState(roomDetailFake);
  const [register, setRegister] = useState(false);
  const handleOnClickRegister = () => {
    setRegister(!register);
  };

  useEffect(() => {
    setRoomDetail(roomDetailFake);
  }, []);

  const LoadingSkeleton = () => (
    <div className="container product-skeleton py-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <Skeleton height={400} width="100%" />
        </div>
        <div className="col-md-6">
          <Skeleton height={40} width="80%" />
          <Skeleton height={30} width="50%" />
          <Skeleton height={20} width="60%" />
          <Skeleton height={20} width="60%" />
          <Skeleton height={50} width="40%" />
        </div>
      </div>
    </div>
  );

  const ProductDetails = () => (
    <div className="container product-page">
      <div className="row justify-content-center">
        <div className="col-lg-10 product-container">
          <NavLink to="/menu" className="back-link btn btn-outline-primary">
            <MoveLeft /> Back to Menu
          </NavLink>
          <div className="row">
            <div className="col-md-6 text-center justify-content-center align-items-center">
              <img
                src={pictureRoom}
                alt={"room"}
                className="product-image img-fluid"
              />
            </div>
            <div className="col-md-6">
              <div className="product-details">
                <h2 className="product-title">
                  {" "}
                  Loại phòng: {typeTable[roomDetail.type]}
                </h2>
                {/* <p className="product-category">{product.category}</p> */}
                <div className="product-rating">
                  <span className="wrapper_maxSeat_room">
                    {" "}
                    Số chỗ tối đa: {roomDetail.maxSeat}{" "}
                  </span>
                  Rating: 5/5 <Star />
                  <i className="fa fa-star rating-icon"></i>
                </div>
                <h3 className="product-price">
                  Tòa: {building[roomDetail.building]} - Tầng:{" "}
                  {roomDetail.floor}
                </h3>
                <h2 className="product-price">
                  Phòng: {roomDetail.roomNumber}
                </h2>
                {/* <p className="product-description">{product.moTa}</p> */}
                <button className="btn btn-buy" onClick={handleOnClickRegister}>
                  Dặt chỗ học
                </button>
                {/* <button className="btn btn-cart">Tham gia phòng học</button> */}
              </div>
              <div className="product-details-section">
                <h4>Chi tiết</h4>
                <p className="text-muted">{roomDetail.description}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Comments box */}
      <div className="row d-flex justify-content-center mt-5">
        <div className="col-md-11 col-lg-9 col-xl-7">
          <div className="d-flex flex-start mb-4">
            <img
              src="https://th.bing.com/th/id/OIP.vSLjVawLO3L3rbX3WtbJNwHaHa?rs=1&pid=ImgDetMain"
              alt="avatar"
              className="rounded-circle shadow-1-strong me-3"
              width="60"
              height="60"
            />
            <div className="card w-100">
              <div className="card-body p-4">
                <div>
                  <h5>Le Huy</h5>
                  <p className="small">3 hours ago</p>
                  <p>
                    Phòng học nơi đây tiện nghi, có hỗ trợ đầy đủ các thiết bị
                    và không gian thoải mái
                  </p>
                  <div className="d-flex justify-content-between align-items-center">
                    <div className="d-flex align-items-center">
                      <button className="btn btn-outline-primary">
                        <ThumbsUp />
                      </button>
                      <button className="btn btn-outline-danger ms-3">
                        <ThumbsDown />
                      </button>
                    </div>
                    <button className="btn btn-outline-primary">
                      <Reply />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {register && (
        <RegisterForm onClickCloseRegisterForm={handleOnClickRegister} />
      )}
    </div>
  );

  return (
    // <>{loading ? <LoadingSkeleton /> : roomDetail && <ProductDetails />}</>
    <ProductDetails />
  );
}

export default Product;
