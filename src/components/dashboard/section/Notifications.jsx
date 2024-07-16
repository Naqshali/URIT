"use client";
import React, { useEffect, useState } from "react";
import notificationsStore from "@/store/notifications";

function Notifications() {
  const { getNotifications } = notificationsStore();
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    fetchNotifications();
  }, []);

  const fetchNotifications = async () => {
    const params = {
      isRead: false,
      pageNumber: 0,
      pageSize: 10,
    };
    const result = await getNotifications(params);
    if (result) {
      setNotifications(result.notifications);
    }
  };

  return (
    <>
      <div class="container">
        <div class="row">
          <div class="col-lg-12">
            <div class="box shadow-sm rounded bg-white mb-3">
              <div class="box-title border-bottom p-3">
                <h6 class="m-0">Recent</h6>
              </div>
              <div class="box-body p-0">
                {notifications.map((notification, index) => (
                  <div
                    class="p-3 d-flex align-items-center bg-light border-bottom osahan-post-header"
                    key={index}
                  >
                    <div class="dropdown-list-image me-3">
                      <img
                        class="rounded-circle"
                        src="https://bootdey.com/img/Content/avatar/avatar3.png"
                        alt=""
                      />
                    </div>
                    <div class="fw-bold me-3">
                      <div class="text-truncate">{notification.message}</div>
                      <div class="small">
                        Income tax sops on the cards, The bias in VC funding,
                        and other top news for you
                      </div>
                    </div>
                    <span class="ms-auto mb-auto">
                      <div class="btn-group">
                        <button
                          type="button"
                          class="btn btn-light btn-sm rounded"
                          data-bs-toggle="dropdown"
                          aria-haspopup="true"
                          aria-expanded="false"
                        >
                          <i class="mdi mdi-dots-vertical"></i>
                        </button>
                        <div class="dropdown-menu dropdown-menu-end">
                          <button class="dropdown-item" type="button">
                            <i class="mdi mdi-delete"></i> Delete
                          </button>
                          <button class="dropdown-item" type="button">
                            <i class="mdi mdi-close"></i> Turn Off
                          </button>
                        </div>
                      </div>
                      <br />
                      <div class="text-end text-muted pt-1">3d</div>
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Notifications;
