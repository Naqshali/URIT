import notificationsStore from "@/store/notifications";
import Pusher from "pusher-js";
import { useEffect } from "react";
import signUpStore from "@/store/signUp";
import globalStore from "@/store/global";

export default function PusherInit() {
  const { loggedInUser } = signUpStore();
  const { setGlobalToastr } = globalStore();
  const { setShowNotificationIcon, saveNewNotification } = notificationsStore();

  useEffect(() => {
    if (loggedInUser) {
      const pusher = new Pusher("1a37ac12ec6f1e056d88", {
        cluster: "ap2",
      });

      const channel = pusher.subscribe("notifications");
      channel.bind(`event-${loggedInUser.userId}`, function (data) {
        console.log("Notification", data);
        setGlobalToastr({ ...data, description: data.message });
        setShowNotificationIcon(true);
        saveNewNotification(data);
      });

      return () => {
        channel.unbind_all();
        channel.unsubscribe();
      };
    }
  }, [loggedInUser]);

  return <></>;
}
