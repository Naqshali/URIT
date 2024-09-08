"use client";
import React, { useEffect, useState } from "react";
import notificationsStore from "@/store/notifications";
import { useRouter } from "next/navigation";
import chatStore from "@/store/chat";

function Notifications() {
  const {
    newNotification,
    saveNewNotification,
    getNotifications,
    markNotificationAsRead,
  } = notificationsStore();
  const { addParticipantInMeeting } = chatStore();

  const [notifications, setNotifications] = useState([]);
  const router = useRouter();

  useEffect(() => {
    fetchNotifications();
  }, []);

  useEffect(() => {
    if (newNotification) {
      const prevNotification = [...notifications];
      prevNotification.unshift(newNotification);
      saveNewNotification(null);
    }
  }, [newNotification]);

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

  const routeTo = async (notification) => {
    await markNotificationAsRead(notification.id);

    if (notification.notificationType === "Call" && notification.meetingId) {
      const participant = await addParticipantInMeeting(
        notification.meetingId,
        {
          picture: "https://www.svgrepo.com/show/452030/avatar-default.s",
          projectId: notification.projectId,
          proposalId: notification.proposalId,
        }
      );

      if (participant) {
        window.open(
          `https://app.dyte.io/v2/meeting?id=${notification.meetingId}&authToken=${participant.token}`
        );
      }
      return;
    }

    if (notification.notificationType === "Message") {
      router.push("/chats");
    } else {
      router.push("/manage-projects");
    }
  };

  return (
    <>
      <div className="container">
        <div className="row">
          <div className="col-lg-12">
            <div className="box shadow-sm rounded bg-white mb-3">
              <div className="box-title border-bottom p-3">
                <h6 className="m-0">Recent</h6>
              </div>
              <div className="box-body p-0">
                {notifications.map((notification, index) => (
                  <div
                    className="p-3 d-flex align-items-center bg-light border-bottom osahan-post-header"
                    key={index}
                    onClick={() => routeTo(notification)}
                  >
                    <div className="dropdown-list-image me-3">
                      <img
                        className="rounded-circle"
                        src="https://bootdey.com/img/Content/avatar/avatar3.png"
                        alt=""
                      />
                    </div>
                    <div className="fw-bold me-3">
                      <div className="text-truncate">
                        {notification.message}
                      </div>
                      {/* <div className="small">
                        Income tax sops on the cards, The bias in VC funding,
                        and other top news for you
                      </div> */}
                    </div>
                    <span className="ms-auto mb-auto">
                      <button type="button" className="btn btn-light">
                        Join
                      </button>
                      {/* <div className="btn-group">
                        <button
                          type="button"
                          className="btn btn-light btn-sm rounded"
                          data-bs-toggle="dropdown"
                          aria-haspopup="true"
                          aria-expanded="false"
                        >
                          <i className="mdi mdi-dots-vertical"></i>
                        </button>
                        <div className="dropdown-menu dropdown-menu-end">
                          <button className="dropdown-item" type="button">
                            <i className="mdi mdi-delete"></i> Delete
                          </button>
                          <button className="dropdown-item" type="button">
                            <i className="mdi mdi-close"></i> Turn Off
                          </button>
                        </div>
                      </div> */}
                      <br />
                      {/* <div className="text-end text-muted pt-1">3d</div> */}
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
