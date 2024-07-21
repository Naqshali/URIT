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
    getNotificationsCount,
  } = notificationsStore();
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    fetchNotifications();
    fetchCount();
  }, []);

  useEffect(() => {
    if (newNotification) {
      const prevNotification = [...notifications];
      prevNotification.unshift(newNotification);
      setNotifications(prevNotification);
      saveNewNotification(null);
    }
  }, [newNotification]);

  const fetchCount = async () => {
    const result = await getNotificationsCount();
    if (result && result.count > 0) {
      setShowNotificationIcon(true);
    }
  };

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
