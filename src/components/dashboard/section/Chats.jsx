"use client";

import React, { useState, useEffect } from "react";
import signUpStore from "@/store/signUp";
import {
  connectChat,
  disconnectChat,
  sendMessage,
} from "@/services/ChatService";
import { chatMsgDateFormat, chatMsgItemDateFormat } from "@/utils/global";
import pusherNotificationStore from "@/store/pusher";
import { useSearchParams } from "next/navigation";
import moment from "moment";

export default function Chats() {
  const { loggedInUser } = signUpStore();
  const { latestNotification } = pusherNotificationStore();
  const [messageInput, setMessageInput] = useState("");
  const searchParams = useSearchParams();

  const projectId = searchParams.get("projectId");
  let proposalId = searchParams.get("proposalId");
  const providerName = searchParams.get("providerName");
  const projectName = searchParams.get("projectName");

  const token = loggedInUser?.token;
  const channel = `/topic/urit/chat/`;
  let client = null;

  const [chats, setChats] = useState([]);
  const [newChat, setNewChat] = useState(null);
  const [selectedChat, setSelectedChat] = useState(null);

  useEffect(() => {
    console.log("client", token, client);
    console.log("client typoe", typeof client);
    if (!token) {
      return;
    }

    if (client) {
      return;
    }

    client = connectChat(token, channel, messageReceivedHandler);
    return () => {
      disconnectChat();
    };
  }, [token]);

  useEffect(() => {
    if (client) {
      if (projectId && providerName) {
        setDefaultMessage();
      }
    }
  }, [client]);

  useEffect(() => {
    if (
      loggedInUser?.userId == latestNotification?.userId &&
      latestNotification?.type === "msg"
    ) {
      setChatsList(latestNotification);
    }
  }, [latestNotification]);

  useEffect(() => {
    if (newChat) {
      proposalId = newChat.proposalId;
      console.log("proposalId", proposalId);
      console.log("newChat", newChat);
      setChatsList(newChat);
    }
  }, [newChat]);

  useEffect(() => {
    console.log("chats", chats);
  }, [chats]);

  const onSendMsg = () => {
    console.log("ASdasd", projectId);
    sendMessage({
      msg: messageInput,
      senderId: loggedInUser.userId,
      proposalId: 3,
    });
    setMessageInput("");
  };

  const messageReceivedHandler = (msg) => {
    console.log("Message Received", msg);
    setNewChat(msg);
  };

  const setDefaultMessage = () => {
    const obj = {
      senderId: loggedInUser.userId,
      senderName: providerName,
      projectTitle: projectName,
      createdAt: moment(),
      text: "Proposal Accepted",
      receiverId: loggedInUser.userId,
      type: "msg",
    };
    setChatsList(obj);
    sendMessage({
      msg: "Proposal Accepted",
      senderId: loggedInUser.userId,
      proposalId: proposalId,
    });
  };

  const setChatsList = (notification) => {
    const memberExist = chats.find(
      (chat) => chat.receiverId == notification.senderId
    );

    if (!memberExist) {
      const obj = {
        receiverId: notification.senderId,
        senderName: notification.senderName,
        projectTitle: notification.projectTitle,
        date: chatMsgDateFormat(notification.createdAt),
        msgs: [
          {
            text: notification.text,
            type:
              loggedInUser.userId == notification.senderId
                ? "outgoing"
                : "incoming",
            dateTime: notification.createdAt,
          },
        ],
      };

      const prevChats = [...chats];
      setChats([obj, ...prevChats]);
      setSelectedChat(obj);
    } else {
      const msgObj = {
        text: notification.text,
        type:
          loggedInUser.userId == notification.senderId
            ? "outgoing"
            : "incoming",
        dateTime: notification.createdAt,
      };
      memberExist.msgs.push(msgObj);
      const prevChats = [...chats];

      const updatedUserMsgs = prevChats.map((chat) =>
        chat.userId == notification.senderId ? memberExist : chat
      );

      setChats(updatedUserMsgs);
    }
  };

  return (
    <>
      <div className="messaging">
        <div className="inbox_msg">
          <div className="inbox_people">
            <div className="headind_srch">
              <div className="recent_heading">
                <h4>Recent</h4>
              </div>
              <div className="srch_bar">
                <div className="stylish-input-group">
                  <input
                    type="text"
                    className="search-bar"
                    placeholder="Search"
                  />
                </div>
              </div>
            </div>
            <div className="inbox_chat scroll">
              {chats.map((chat, index) => (
                <div
                  className={`chat_list ${
                    chat.userId === selectedChat.userId ? "active_chat" : ""
                  }`}
                  key={index}
                  onClick={() => setSelectedChat(chat)}
                >
                  <div className="chat_people">
                    <div className="chat_img">
                      {" "}
                      <img src="https://ptetutorials.com/images/user-profile.png" />{" "}
                    </div>
                    <div className="chat_ib">
                      <h5>
                        {chat.senderName}{" "}
                        <span className="chat_date">{chat.date}</span>
                      </h5>
                      <p>{chat.msgs[chat.msgs.length - 1].text}</p>
                    </div>
                  </div>
                </div>
              ))}
              {!chats.length && (
                <div className="text-align-center pt50p">No Chat History.</div>
              )}
            </div>
          </div>
          <div className="mesgs">
            <div className="msg_history">
              {selectedChat?.msgs.map((msg, index) => (
                <div key={index}>
                  {msg.type === "incoming" ? (
                    <div className="incoming_msg mt10">
                      <div className="incoming_msg_img">
                        {" "}
                        <img
                          src="https://ptetutorials.com/images/user-profile.png"
                          alt="sunil"
                        />{" "}
                      </div>
                      <div className="received_msg">
                        <div className="received_withd_msg">
                          <p>{msg.text}</p>
                          <span className="time_date">
                            {" "}
                            {chatMsgItemDateFormat(msg.dateTime)}
                          </span>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="outgoing_msg">
                      <div className="sent_msg">
                        <p>{msg.text}</p>
                        <span className="time_date">
                          {" "}
                          {chatMsgItemDateFormat(msg.dateTime)}
                        </span>{" "}
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
            <div className="type_msg">
              <div className="input_msg_write">
                <input
                  type="text"
                  className="write_msg"
                  placeholder="Type a message"
                  value={messageInput}
                  onChange={(e) => setMessageInput(e.target.value)}
                />
                <button
                  className="msg_send_btn"
                  type="button"
                  onClick={onSendMsg}
                >
                  <i className="fa fa-paper-plane" aria-hidden="true"></i>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
