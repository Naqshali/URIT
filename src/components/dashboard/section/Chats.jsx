"use client";

import React, { useState, useEffect } from "react";
import signUpStore from "@/store/signUp";
import {
  connectChat,
  disconnectChat,
  sendMessage,
} from "@/services/ChatService";
import { chatMsgDateFormat } from "@/utils/global";

export default function Chats() {
  const { loggedInUser } = signUpStore();
  const [messageInput, setMessageInput] = useState("");
  const token = loggedInUser?.token;
  const channel = "/topic/urit/chat";
  let client = null;

  const [messages, setMessages] = useState([
    {
      text: "Test which is a new approach to have all solutions",
      type: "incoming",
      dateTime: "11:01 | June 8",
    },
    {
      text: "Test which is a new approach to have all solutions",
      type: "outgoing",
      dateTime: "11:01 | June 8",
    },
  ]);

  const userId = localStorage.getItem("user_profile_id");

  useEffect(() => {
    if (!token) {
      return;
    }

    if (client) {
      return;
    }

    client = connectChat(token, channel, messageReceivedHandler);
    console.log("client", client);
    return () => {
      disconnectChat();
    };
  }, [token]);

  const onSendMsg = () => {
    sendMessage(messageInput);
    setMessageInput("");
  };

  const messageReceivedHandler = (msg) => {
    console.log("Received messages:", msg);
    let newMsgs = messages;
    newMsgs.push({
      text: msg.text,
      type: userId == msg.senderId ? "outgoing" : "incoming",
      dateTime: chatMsgDateFormat(msg.createdAt),
    });
    setMessages([...newMsgs]);
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
              <div className="chat_list active_chat">
                <div className="chat_people">
                  <div className="chat_img">
                    {" "}
                    <img
                      src="https://ptetutorials.com/images/user-profile.png"
                      alt="sunil"
                    />{" "}
                  </div>
                  <div className="chat_ib">
                    <h5>
                      Sunil Rajput <span className="chat_date">Dec 25</span>
                    </h5>
                    <p>
                      Test, which is a new approach to have all solutions
                      astrology under one roof.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="mesgs">
            <div className="msg_history">
              {messages.map((msg, index) => (
                <div key={index}>
                  {msg.type === "incoming" ? (
                    <div className="incoming_msg">
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
                          <span className="time_date"> {msg.dateTime}</span>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="outgoing_msg">
                      <div className="sent_msg">
                        <p>{msg.text}</p>
                        <span className="time_date"> {msg.dateTime}</span>{" "}
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
