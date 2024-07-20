"use client";
import { useEffect, useState } from "react";
import notificationsStore from "@/store/notifications";
import { useRouter } from "next/navigation";
import { dateFormat } from "@/utils/global";

function HeaderNotifications() {
  const router = useRouter();
  const { newNotification, saveNewNotification, getNotifications } =
    notificationsStore();
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    fetchNotifications();
  }, []);

  useEffect(() => {
    console.log("newNotification", newNotification);
    if (newNotification) {
      const prevNotification = [...notifications];
      prevNotification.unshift(newNotification);
      setNotifications(prevNotification);
      saveNewNotification(null);
    }
  }, [newNotification]);

  const fetchNotifications = async () => {
    const params = {
      isRead: false,
      pageNumber: 0,
      pageSize: 100,
    };
    const result = await getNotifications(params);
    if (result) {
      setNotifications(result.notifications);
    }
  };

  const routeTo = () => {
    router.push("/notifications");
  };

  return (
    <>
      <div className="dropdown show pr20">
        <a
          href="#"
          className="login-info "
          data-toggle="dropdown"
          role="button"
          aria-haspopup="true"
          aria-expanded="false"
        >
          Notifications
        </a>
        <div
          className="dropdown-menu custom-notification-dropdown"
          aria-labelledby="dropdownMenuLink"
        >
          {notifications.map((notification, index) => (
            <div key={index}>
              <a
                className="dropdown-item"
                href="#"
                onClick={() => routeTo(notification)}
              >
                {notification.message} <br />
                <span className="msg-info">
                  <span className="fs-12">
                    {dateFormat(notification.createAt)}
                  </span>
                  <span className="fs-12">
                    {notification.messageSenderName}
                  </span>
                </span>
              </a>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default HeaderNotifications;
