"use client";
import { useEffect, useState } from "react";
import notificationsStore from "@/store/notifications";
import { useRouter } from "next/navigation";

function HeaderNotifications() {
  const router = useRouter();
  const {
    setShowNotificationIcon,
    showNotificationIcon,
    newNotification,
    saveNewNotification,
    getNotifications,
  } = notificationsStore();
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    fetchNotifications();
  }, []);

  useEffect(() => {
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
    setShowNotificationIcon(false);
    router.push("/notifications");
  };

  return (
    <>
      <div className="dropdown show pr20">
        <a href="#" className="notification-info" onClick={routeTo}>
          <i className="fa fa-bell" aria-hidden="true"></i>
          {showNotificationIcon && <span className="notification-count"></span>}
        </a>
      </div>
    </>
  );
}

export default HeaderNotifications;
