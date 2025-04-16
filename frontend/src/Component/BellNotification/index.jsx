import React, { useEffect, useState, useRef } from "react";

import { Bell } from "lucide-react"; // Import CSS for styling

import className from "classnames/bind";
import styles from "./styles.module.scss";
const cx = className.bind(styles);
const notificationData = [
  {
    id: 1,
    message: "Bạn đã đặt chỗ thành công",
  },
  {
    id: 2,
    message: "Phòng học đã đặt sẽ bắt đầu sau 30p nữa",
  },
];
const BellNotification = ({ stateNotification, setStateBellNotification }) => {
  const [notifications, setNotifications] = useState(notificationData);

  // useEffect(() => {
  //   // Tạo kết nối WebSocket
  //   const socket = new SockJS("http://localhost:8080/ws");
  //   const stompClient = new Client({
  //     webSocketFactory: () => socket,
  //     debug: function (str) {
  //       console.log(str); // Debug kết nối
  //     },
  //     onConnect: () => {
  //       console.log("Connected to WebSocket");
  //       // Subscribe tới topic notifications
  //       stompClient.subscribe("/topic/notifications", (message) => {
  //         const notification = JSON.parse(message.body);
  //         setNotifications((prev) => [...prev, notification]);
  //       });
  //     },
  //     onStompError: (frame) => {
  //       console.error("Broker reported error: ", frame.headers["message"]);
  //       console.error("Additional details: ", frame.body);
  //     },
  //   });

  //   stompClient.activate();

  //   return () => stompClient.deactivate(); // Dừng kết nối khi component bị huỷ
  // }, []);

  const notificationRef = useRef(null); // Tạo ref để tham chiếu danh sách thông báo

  // Xử lý click bên ngoài
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        notificationRef.current &&
        !notificationRef.current.contains(event.target)
      ) {
        setStateBellNotification(false); // Ẩn danh sách thông báo nếu click bên ngoài
      }
    };

    document.addEventListener("mousedown", handleClickOutside); // Lắng nghe sự kiện click
    return () => {
      document.removeEventListener("mousedown", handleClickOutside); // Dọn dẹp sự kiện khi unmount
    };
  }, []);

  return (
    <div className={cx("wrapper_bell_notification")}>
      <Bell
        size={24}
        className={cx("", {
          activeBell: stateNotification === true,
        })}
      />
      {stateNotification && (
        <div ref={notificationRef} className={cx("wrapper_notification")}>
          <h3 className={cx("wrapper_title")}>Thông báo</h3>
          <ul className={cx("notification_list")}>
            {notifications.map((notiMessage, index) => (
              <div className={cx("wrapper_message")}>
                <li className={cx("message")} key={index}>
                  {notiMessage.message}
                </li>
                <span className={cx("wrapper_date")}>1 ngày</span>
              </div>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default BellNotification;
