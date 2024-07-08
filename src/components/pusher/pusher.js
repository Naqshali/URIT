import pusherNotificationStore from "@/store/pusher";
import Pusher from "pusher-js";
import { useEffect } from "react";

export default function PusherInit() {
  const { saveNotification } = pusherNotificationStore();

  useEffect(() => {
    const pusher = new Pusher("3213023a7b5ce6b8d90d", {
      cluster: "ap2",
    });

    const channel = pusher.subscribe("my-channel");
    channel.bind("my-event", function (data) {
      console.log("Notification", data);
      saveNotification(data);
    });

    return () => {
      channel.unbind_all();
      channel.unsubscribe();
    };
  }, []);

  return <></>;
}
