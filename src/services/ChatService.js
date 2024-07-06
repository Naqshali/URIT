import SockJS from "sockjs-client";
import Stomp from "stompjs";

let sock = null;
let stompClient = null;
export function connectChat(token, channel, messageReceivedCallback) {
  const socket = new SockJS("http://157.175.52.228:8085/ws");
  const client = Stomp.over(socket);
  client.connect(
    {
      Authorization: "Bearer " + token,
    },
    (frame) => {
      stompClient = client; // Save client to state after connection
      client.subscribe(channel, (message) => {
        messageReceivedCallback(JSON.parse(message.body));
      });
    }
  );

  return client;
}

export function disconnectChat() {
  if (stompClient !== null) {
    stompClient.disconnect();
  }
}

export function sendMessage(message) {
  if (stompClient) {
    const messageContent = message.trim();

    if (messageContent !== "") {
      stompClient.send(
        "/app/chat.sendMessage",
        {},
        JSON.stringify({
          text: messageContent,
          senderId: localStorage.getItem("user_profile_id"),
          proposalId: 1,
        })
      );
    }
  }
}
