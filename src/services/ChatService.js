import SockJS from "sockjs-client";
import Stomp from "stompjs";

let stompClient = null;
export function connectChat(token, channel, messageReceivedCallback) {
  const socket = new SockJS("https://urit-be-server.pro/ws");
  const client = Stomp.over(socket);
  client.debug = () => {};
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

export function sendMessage(obj) {
  if (stompClient) {
    const messageContent = obj.msg.trim();

    if (messageContent !== "") {
      let data = {
        text: messageContent,
        senderId: obj.senderId,
        proposalId: obj.proposalId,
        chatType: obj.chatType,
      };
      if (obj.receiverId) {
        data.receiverId = obj.receiverId;
      }
      stompClient.send("/app/chat.sendMessage", {}, JSON.stringify(data));
    }
  }
}
