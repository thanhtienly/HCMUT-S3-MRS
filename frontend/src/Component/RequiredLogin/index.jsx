import { useEffect, useState } from "react";
import styles from "./  Required.module.scss";
import classNames from "classnames/bind";
const cx = classNames.bind(styles);
function RequiredLogin() {
  const [count, setCount] = useState(3);
  useEffect(() => {
    setInterval(() => {}, 1000);
  }, []);
  return (
    <div>
      <h5> Màn hình sẽ chuyển sang trang đăng nhập trong: {count} </h5>
      <button> Hủy </button>
    </div>
  );
}
export default RequiredLogin;
