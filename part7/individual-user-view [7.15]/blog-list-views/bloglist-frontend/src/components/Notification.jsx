//part of 7.10 answer
import { useNotificationValue } from "../notificationContext";

const Notification = ({ message }) => {
  //{ message }
  const notification = useNotificationValue()
  if (notification === null) {
    return null;
  }
  /*if (type === "success" && message !== null) {
        return (
            <div className="success">
            {message}
          </div>
        )
    }*/
  if (notification.includes('added')) {
    return <div className="success">{notification}</div>;
  }
  return <div className="error">{notification}</div>;
};

export default Notification;
