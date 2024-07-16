"use client";
import { useEffect, useState } from "react";
import notificationsStore from "@/store/notifications";
import { useRouter } from "next/navigation";

function HeaderNotifications() {
  const router = useRouter();
  const { getNotifications } = notificationsStore();
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    fetchNotifications();
  }, []);

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
          {notifications.map((notification) => (
            <a
              className="dropdown-item"
              href="#"
              onClick={() => routeTo(notification)}
            >
              {notification.message}
            </a>
          ))}
        </div>
      </div>
    </>
  );
}

export default HeaderNotifications;
