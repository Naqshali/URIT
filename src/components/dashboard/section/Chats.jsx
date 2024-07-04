"use client";

import React, { useState, useEffect } from "react";
import signUpStore from "@/store/signUp";
import {
  connectChat,
  disconnectChat,
  sendMessage,
  receiveMessage,
} from "@/services/ChatService";

export default function Chats() {
  const { loggedInUser } = signUpStore();
  const [messageInput, setMessageInput] = useState("");
  const token = loggedInUser?.token;
  const [message, setMessages] = useState([
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

  useEffect(() => {
    if (!token) {
      return;
    }

    connectChat(token, messageReceivedHandler);
    return () => {
      disconnectChat();
    };
  }, [token]);

  const onSendMsg = () => {
    sendMessage(messageInput);
    setMessageInput("");
  };

  const messageReceivedHandler = (msg) => {
    console.log("Received message:", msg);
    console.log(localStorage.getItem("user_profile_id"), msg.senderId);
    let newMsgs = message;
    newMsgs.push({
      text: msg.text,
      type:
        localStorage.getItem("user_profile_id") == msg.senderId
          ? "outgoing"
          : "incoming",
      dateTime: "11:01 | June 8",
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
              {message.map((msg) => (
                <div>
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
                          <span className="time_date"> {msg.date}</span>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="outgoing_msg">
                      <div className="sent_msg">
                        <p>{msg.text}</p>
                        <span className="time_date"> {msg.date}</span>{" "}
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
