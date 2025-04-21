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
import ErrorNotification from "../../ErrorNotification";

const typeTable = ["Tự học", "Học nhóm", "Mentoring"];
const building = ["H1", "H2", "H3", "H6"];
const stateRoom = ["Trống", "Đã đặt"];
const roomDetailFake = DataFake[0];

function RoomDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [roomDetail, setRoomDetail] = useState([]);
  const [loading, setLoading] = useState(true);
  const [register, setRegister] = useState(false);

  const [messageError, setMessageError] = useState("");
  const [commentError, setCommentError] = useState(false);
  const [comments, setComments] = useState([]);
  const commentRef = React.useRef(null);

  useEffect(() => {
    fetchAllComment();
  }, []);

  const handleOnClickRegister = () => {
    setRegister(!register);
  };

  const fetchAllComment = async () => {
    try {
      const response = await fetch("http://localhost:8000/room/1/comment"); // Replace with your API endpoint
      const data = await response.json();
      setComments(data.data);
    } catch (error) {
      console.error("Error fetching comments:", error);
    }
  };

  const handleSubmitComment = async (e) => {
    e.preventDefault();
    const content = commentRef.current.value;

    if (!content.trim()) {
      setCommentError(true);
      setMessageError("Bình luận không thể trống");
      return;
    }

    const idUser = localStorage.getItem("idUser");
    // e.preventDefault();
    if (idUser === null) {
      // e.preventDefault();
      navigate("/signin");
    } else {
      try {
        await fetch(`http://localhost:8000/room/${id}/comment`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "user-id": idUser,
          },
          body: JSON.stringify({
            content: content.trim(),
          }),
        });
        commentRef.current.value = "";
        fetchAllComment();
      } catch (error) {
        setCommentError(true);
        setMessageError("Lỗi khi lưu bình luận");
        console.error("Error submitting comment:", error);
        commentRef.current.value = "";
      }
    }
  };

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);
        const response = await fetch(`http://localhost:8000/room/${id}`);
        const data = await response.json();
        setRoomDetail(data.data);
      } catch (error) {
        console.error("Error fetching product data:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();
  }, [id]);

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
                  Loại phòng: {roomDetail.type}
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

      {register && (
        <RegisterForm
          onClickCloseRegisterForm={handleOnClickRegister}
          roomId={id}
          typeOfRoom={roomDetail.type}
        />
      )}
    </div>
  );

  const Comment = () => (
    <div className="container comment-container">
      <div className="comment-area d-flex flex-column">
        <p>Bình luận</p>
        <textarea
          name="comment"
          id="comment"
          ref={commentRef}
          placeholder="Vui lòng nhập bình luận của bạn"
        ></textarea>
        <div className="d-flex justify-content-end">
          <button
            type="button"
            class="btn btn-primary"
            id="comment-submit"
            onClick={handleSubmitComment}
          >
            Gửi
          </button>
        </div>
      </div>

      <div className="comment-list">
        {comments.map((comment) => (
          <div className="comment-item d-flex flex-column">
            <div className="comment-info d-flex flex-row flex-wrap">
              <p className="name">{comment.userName}</p>
              <p className="date">{comment.date.split("T").join(" ")}</p>
            </div>
            <div className="comment-content">{comment.content}</div>
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <>
      {loading ? (
        <LoadingSkeleton />
      ) : (
        roomDetail && (
          <>
            <ProductDetails />
            <Comment />
          </>
        )
      )}
    </>
    // <ProductDetails />
  );
}

export default RoomDetail;
