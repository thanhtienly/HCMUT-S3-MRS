import { FailIcon } from "../Component/Icon/Icon";
import "./styles.scss";

function ErrorNotification({ message }) {
  return (
    <div className="wrapper_error_notification">
      <FailIcon className="wrapper_icon_fail" />
      <span className="wrapper_error_notification_message"> {message} </span>
    </div>
  );
}
export default ErrorNotification;
