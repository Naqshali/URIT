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
import chatStore from "@/store/chat";

export default function Chats() {
  const { loggedInUser } = signUpStore();
  const { getChats, getProjectChat } = chatStore();
  const { latestNotification } = pusherNotificationStore();
  const [messageInput, setMessageInput] = useState("");
  const searchParams = useSearchParams();

  const projectId = searchParams.get("projectId");
  let proposalId = searchParams.get("proposalId");
  const providerName = searchParams.get("providerName");
  const projectName = searchParams.get("projectName");
  const serviceProviderId = searchParams.get("serviceProviderId");

  const token = loggedInUser?.token;
  const channel = `/topic/urit/chat/${loggedInUser?.userId}`;
  let client = null;

  const [chats, setChats] = useState([]);
  const [newChat, setNewChat] = useState(null);
  const [selectedChat, setSelectedChat] = useState(null);

  useEffect(() => {
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
    fetchChats();
  }, []);

  useEffect(() => {
    if (client && projectId && providerName) {
      setDefaultMessage();
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
      setChatsList(newChat);
    }
  }, [newChat]);

  const fetchChats = async (chat) => {
    const params = {
      pageNumber: 0,
      pageSize: 10,
    };
    const result = await getChats(params);
    const list = [];
    result.chats.forEach((row, index) => {
      let obj = {
        userId: index,
        senderId: row.clientId,
        senderName: row.clientName,
        members: [parseInt(row.clientId), parseInt(row.serviceProviderId)],
        projectId: row.projectId,
        projectTitle: row.projectTitle,
        proposalId: row.proposalId,
        receiverName: row.serviceProviderName,
        date: "",
        msgs: [],
      };
      list.push(obj);
    });
    setChats(list);
  };

  const onSelectChat = (chat) => {
    setSelectedChat(chat);
    fetchProjectChat(chat);
  };

  const fetchProjectChat = async (chat) => {
    const params = {
      projectId: chat.projectId,
      proposalId: chat.proposalId,
      pageNumber: 0,
      pageSize: 10,
    };
    const result = await getProjectChat(params);
    const prevSelectedChat = { ...chat };
    const updatedMsgs = result.messages.map((msg) => ({
      ...msg,
      type: msg.senderId === loggedInUser?.userId ? "outgoing" : "incoming",
    }));
    prevSelectedChat.msgs = updatedMsgs;
    setSelectedChat(prevSelectedChat);

    const chatToUpdateMsgs = chats.map((chatTo) => {
      return {
        ...chatTo,
        msgs: chatTo.userId === chat.userId ? updatedMsgs : chatTo.msgs,
      };
    });

    setChats(chatToUpdateMsgs);
  };

  const onSendMsg = () => {
    sendMessage({
      msg: messageInput,
      senderId: loggedInUser.userId,
      proposalId: selectedChat?.proposalId,
    });
    setMessageInput("");
    const prevSelectedChat = { ...selectedChat };
    prevSelectedChat.msgs.push({
      text: messageInput,
      dateTime: moment(),
      type: "outgoing",
      name: loggedInUser.name,
    });
    setSelectedChat(prevSelectedChat);
  };

  const messageReceivedHandler = (msg) => {
    console.log("Message Received", msg);
    setNewChat(msg);
  };

  const setDefaultMessage = () => {
    const obj = {
      senderId: loggedInUser.userId,
      senderName: loggedInUser.name,
      members: [parseInt(loggedInUser.userId), parseInt(serviceProviderId)],
      projectId: projectId,
      projectTitle: projectName,
      proposalId: proposalId,
      receiverId: serviceProviderId,
      receiverName: providerName,
      createdAt: moment(),
      text: "Proposal Accepted",
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
    console.log("chats", chats);
    const chatExists = chats.find(
      (chat) => chat.proposalId == notification.proposalId
    );

    if (
      !chatExists ||
      (chatExists && !chatExists.members.includes(notification.senderId))
    ) {
      const obj = {
        userId: chats.length + 1,
        senderId: loggedInUser.userId,
        senderName: notification.senderName,
        members: [
          parseInt(notification.senderId),
          parseInt(notification.receiverId),
        ],
        projectId: notification.projectId,
        projectTitle: notification.projectTitle,
        proposalId: notification.proposalId,
        receiverName: notification.receiverName,
        date: chatMsgDateFormat(notification.createdAt),
        msgs: [
          {
            text: notification.text,
            type:
              loggedInUser.userId == notification.senderId
                ? "outgoing"
                : "incoming",
            dateTime: notification.createdAt,
            name: notification.senderName,
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
        name: notification.senderName,
      };
      chatExists.msgs.push(msgObj);
      console.log("chatExists", chatExists);
      const prevChats = [...chats];

      const updatedUserMsgs = prevChats.map((chat) =>
        chat.userId == notification.senderId ? chatExists : chat
      );
      console.log("Hrer at alse", updatedUserMsgs);
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
                    chat.userId === selectedChat?.userId ? "active_chat" : ""
                  }`}
                  key={index}
                  onClick={() => onSelectChat(chat)}
                >
                  <div className="chat_people">
                    <div className="chat_img">
                      {" "}
                      <img src="https://ptetutorials.com/images/user-profile.png" />{" "}
                    </div>
                    <div className="chat_ib">
                      <h5>
                        {chat.projectTitle}{" "}
                        <div className="members">
                          {chat.senderName}, {chat.receiverName}
                        </div>
                        <span className="chat_date">{chat.date}</span>
                      </h5>
                      <p>{chat.msgs[chat.msgs.length - 1]?.text}</p>
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
                        <div>{msg.name}</div>
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
