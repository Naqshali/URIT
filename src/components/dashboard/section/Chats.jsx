"use client";

import React, { useState, useEffect, useRef, useMemo } from "react";
import signUpStore from "@/store/signUp";
import {
  connectChat,
  disconnectChat,
  sendMessage,
} from "@/services/ChatService";
import { chatMsgDateFormat, chatMsgItemDateFormat } from "@/utils/global";
import { useSearchParams } from "next/navigation";
import moment from "moment";
import chatStore from "@/store/chat";
import notificationsStore from "@/store/notifications";

export default function Chats() {
  const { loggedInUser } = signUpStore();
  const {
    getChats,
    getProjectChat,
    setActiveChat,
    startMeeting,
    addParticipantInMeeting,
  } = chatStore();
  const { newNotification } = notificationsStore();
  const [messageInput, setMessageInput] = useState("");
  const searchParams = useSearchParams();

  const token = loggedInUser?.token;
  const channel = `/topic/urit/chat/${loggedInUser?.userId}`;
  let client = null;

  const [chats, setChats] = useState([]);
  const [newChat, setNewChat] = useState(null);
  const [selectedChat, setSelectedChat] = useState(null);
  const messagesEndRef = useRef(null);

  const userType = useMemo(() => {
    return loggedInUser?.userType;
  });

  useEffect(() => {
    return () => {
      const chatId = localStorage.getItem("selectedChatId");
      if (chatId && chatId !== "null") {
        saveActiveChat({ chatId: chatId, isActive: false });
        localStorage.setItem("selectedChatId", null);
      }
      disconnectChat();
    };
  }, []);

  useEffect(() => {
    if (!token) {
      return;
    }

    if (client) {
      return;
    }

    client = connectChat(token, channel, messageReceivedHandler);
    console.log("useEffect ~ client:", client);
    return () => {
      disconnectChat();
    };
  }, [token]);

  useEffect(() => {
    fetchChats();
  }, []);

  useEffect(() => {
    if (newChat) {
      setChatsList(newChat);
    }
  }, [newChat]);

  useEffect(() => {
    if (
      selectedChat &&
      newNotification &&
      newNotification.notificationType === "Message"
    ) {
      const newChat = chats.map((chat) => {
        console.log("newChat ~ chat:", chat);
        if (
          chat.proposalId == newNotification.proposalId &&
          chat.chatId !== selectedChat.chatId
        ) {
          return {
            ...chat,
            readByClient: userType === "CLIENT" ? false : chat.readByClient,
            readByServiceProvider:
              userType === "SERVICE_PROVIDER"
                ? false
                : chat.readByServiceProvider,
          };
        } else {
          return chat;
        }
      });
      setChats(newChat);
    }
  }, [newNotification]);

  const fetchChats = async (chat) => {
    const params = {
      pageNumber: 0,
      pageSize: 10,
    };
    const result = await getChats(params);
    if (!result.chats) return;
    const list = [];
    result.chats.forEach((row, index) => {
      let obj = {
        chatId: row.chatId,
        userId: index,
        senderId: row.clientId,
        senderName: row.clientName,
        members: [parseInt(row.clientId), parseInt(row.serviceProviderId)],
        projectId: row.projectId,
        projectTitle: row.projectTitle,
        proposalId: row.proposalId,
        meetingId: row.meetingId,
        serviceProviderId: row.serviceProviderId,
        receiverName: row.serviceProviderName,
        date: "",
        clientIsActive: row.clientIsActive,
        readByClient: row.readByClient,
        readByServiceProvider: row.readByServiceProvider,
        msgs: [],
        chatType: row.chatType,
      };
      list.push(obj);
    });
    setChats(list);
  };

  const onSelectChat = async (chat) => {
    localStorage.setItem("selectedChatId", chat.chatId);
    setSelectedChat(chat);
    await fetchProjectChat(chat);
    if (selectedChat) {
      saveActiveChat({ chatId: selectedChat.chatId, isActive: false });
    }
    saveActiveChat(chat);
  };

  const fetchProjectChat = async (chat) => {
    let params = {};

    if (chat.chatType === "Direct Chat") {
      params = {
        pageNumber: 0,
        pageSize: 10,
        chatType: chat.chatType,
      };
      if (loggedInUser?.userId === chat.senderId) {
        params.userId = chat.serviceProviderId;
      } else {
        params.userId = chat.senderId;
      }
    } else {
      params = {
        projectId: chat.projectId,
        proposalId: chat.proposalId,
        pageNumber: 0,
        pageSize: 10,
        chatType: chat.chatType,
      };
    }

    const result = await getProjectChat(params);
    if (result) {
      result.messages = result.messages.reverse();
      const prevSelectedChat = { ...chat };
      const updatedMsgs = result.messages.map((msg) => ({
        ...msg,
        type: msg.senderId === loggedInUser?.userId ? "outgoing" : "incoming",
        name: msg.senderName,
        dateTime: msg.createdAt,
      }));
      prevSelectedChat.msgs = updatedMsgs;
      setSelectedChat(prevSelectedChat);

      const chatToUpdateMsgs = chats.map((chatTo) => {
        return {
          ...chatTo,
          msgs: chatTo.userId === chat.userId ? updatedMsgs : chatTo.msgs,
          readByClient: userType === "CLIENT" ? true : chatTo.readByClient,
          readByServiceProvider:
            userType === "SERVICE_PROVIDER"
              ? true
              : chatTo.readByServiceProvider,
        };
      });
      console.log("chatToUpdateMsgs", chatToUpdateMsgs);

      setChats(chatToUpdateMsgs);
      setScrolToBottom();
    }
  };

  const saveActiveChat = (selectedChat) => {
    setActiveChat({
      id: selectedChat.chatId,
      isActive: selectedChat.isActive ?? true,
    });
  };

  const setScrolToBottom = () => {
    setTimeout(() => {
      if (messagesEndRef.current) {
        messagesEndRef.current.scrollTop = messagesEndRef.current.scrollHeight;
      }
    }, 100);
  };

  const onSendMsg = () => {
    if (selectedChat.chatType === "Direct Chat") {
      const msg = {
        msg: messageInput,
        senderId: loggedInUser.userId,
        chatType: "Direct Chat",
      };
      if (loggedInUser?.userId === selectedChat.senderId) {
        msg.receiverId = selectedChat.serviceProviderId;
      } else {
        msg.receiverId = selectedChat.senderId;
      }
      sendMessage(msg);
    } else {
      sendMessage({
        msg: messageInput,
        senderId: loggedInUser.userId,
        proposalId: selectedChat?.proposalId,
        chatType: selectedChat.chatType,
      });
    }
    setMessageInput("");
    const prevSelectedChat = { ...selectedChat };
    prevSelectedChat.msgs.push({
      text: messageInput,
      dateTime: moment(),
      type: "outgoing",
      name: loggedInUser.name,
    });
    setSelectedChat(prevSelectedChat);
    setScrolToBottom();
  };

  const messageReceivedHandler = (msg) => {
    console.log("messageReceivedHandler ~ msg:", msg);
    setNewChat(msg);
  };

  const setChatsList = (notification) => {
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
      const prevChats = [...chats];

      const updatedUserMsgs = prevChats.map((chat) =>
        chat.userId == notification.senderId ? chatExists : chat
      );
      setChats(updatedUserMsgs);
    }
  };

  const startCallSession = async (chat, index) => {
    const prevChats = [...chats];
    prevChats[index].meetingId = "valid";
    console.log("startCallSession ~ prevChats:", prevChats);
    setChats(prevChats);
    const meeting = await startMeeting({
      userId: loggedInUser?.userId,
      projectId: chat.projectId,
      proposalId: chat.proposalId,
    });

    if (meeting) {
      const participant = await addParticipantInMeeting(meeting.id, {
        picture: "https://www.svgrepo.com/show/452030/avatar-default.s",
        projectId: chat.projectId,
        proposalId: chat.proposalId,
      });

      if (participant) {
        window.open(
          `https://app.dyte.io/v2/meeting?id=${meeting.id}&authToken=${participant.token}`
        );
      }
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
                >
                  <div className="chat_people">
                    <div className="chat_img">
                      {" "}
                      <img src="https://ptetutorials.com/images/user-profile.png" />{" "}
                    </div>
                    <div
                      className="chat_ib notification-info"
                      onClick={() => onSelectChat(chat)}
                    >
                      <h5>
                        {chat.projectTitle}{" "}
                        <div className="members">
                          {chat.senderName}, {chat.receiverName} -{" "}
                          {chat.meetingId}
                        </div>
                        <span className="chat_date">{chat.date}</span>
                      </h5>
                      {((userType === "CLIENT" && !chat.readByClient) ||
                        (userType === "SERVICE_PROVIDER" &&
                          !chat.readByServiceProvider)) && (
                        <span className="notification-count-chat"></span>
                      )}
                    </div>
                    {chat.meetingId ? (
                      <button
                        type="button"
                        onClick={() => startCallSession(chat, index)}
                      >
                        Join
                      </button>
                    ) : (
                      <span class="call-icon">
                        <i
                          class="fa fa-phone"
                          aria-hidden="true"
                          onClick={() => startCallSession(chat, index)}
                        ></i>
                      </span>
                    )}
                  </div>
                </div>
              ))}
              {!chats.length && (
                <div className="text-align-center pt50p">No Chat History.</div>
              )}
            </div>
          </div>
          <div className="mesgs">
            <div className="msg_history" ref={messagesEndRef}>
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
                  onKeyDown={(e) => {
                    if (e.keyCode === 13) {
                      onSendMsg();
                    }
                  }}
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
