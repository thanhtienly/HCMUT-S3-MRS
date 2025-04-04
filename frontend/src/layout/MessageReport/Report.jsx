import "./SuccessStyles.scss";

import { useNavigate } from "react-router-dom";
import { CircleCheck } from "lucide-react";

const Report = () => {
  const navigate = useNavigate();
  return (
    <div className="container">
      <div className="row justify-content-center">
        <div className="col-md-5">
          <div className="message-box _success">
            <CircleCheck color="#28a745" size="48px" />
            <h2> Đã gửi phản hồi tới nhà trường </h2>
            <p> Cảm ơn sinh viên đã sử dụng dịch vụ của nhà trường</p>
          </div>
          <div className="text-center">
            <button
              className="btn btn-primary"
              onClick={() => navigate("/contact")}
            >
              Quay về trang phản hồi
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Report;
