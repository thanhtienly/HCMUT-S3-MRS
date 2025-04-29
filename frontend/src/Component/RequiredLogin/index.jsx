// import { useEffect, useState } from "react";
// import styles from "./  Required.module.scss";
// import classNames from "classnames/bind";
// const cx = classNames.bind(styles);
// function RequiredLogin() {
//   const [count, setCount] = useState(3);
//   useEffect(() => {
//     setInterval(() => {}, 1000);
//   }, []);
//   return (
//     <div>
//       <h5> Màn hình sẽ chuyển sang trang đăng nhập trong: {count} </h5>
//       <button> Hủy </button>
//     </div>
//   );
// }
// export default RequiredLogin;
import styles from "./RequiredLogin.module.scss";

import classNames from "classnames/bind";
import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
const cx = classNames.bind(styles);
function RequiredLogin({ RequiredLogin }) {
  const [count, setCount] = useState(3);
  const navigate = useNavigate();
  const intervalRef = useRef(null); // để clearInterval

  useEffect(() => {
    intervalRef.current = setInterval(() => {
      setCount((prev) => {
        if (prev === 1) {
          clearInterval(intervalRef.current);
          navigate("/signin");
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(intervalRef.current);
  }, []);

  const cancelCountdown = () => {
    clearInterval(intervalRef.current);
    RequiredLogin((prev) => !prev);
  };

  return (
    <div className={cx("wrapper_box_navigate_login")}>
      <h5 className={cx("wrapper_box_navigate_title")}>
        Bạn cần đăng nhập để thực hiện chức năng này
      </h5>
      <h5 className={cx("wrapper_box_navigate_title")}>
        Màn hình sẽ chuyển sang trang đăng nhập trong: <span>{count} </span>giây
      </h5>
      <div className={cx("wrapper_navigate_button")}>
        <button className={cx("button_child")} onClick={cancelCountdown}>
          Hủy
        </button>
      </div>
    </div>
  );
}

export default RequiredLogin;
