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
    let newMsgs = message;
    newMsgs.push({
      text: msg.text,
      type: "outgoing",
      dateTime: "11:01 | June 8",
    });
    setMessages([...newMsgs]);
  };

  return (
    <>
      <div class="messaging">
        <div class="inbox_msg">
          <div class="inbox_people">
            <div class="headind_srch">
              <div class="recent_heading">
                <h4>Recent</h4>
              </div>
              <div class="srch_bar">
                <div class="stylish-input-group">
                  <input type="text" class="search-bar" placeholder="Search" />
                </div>
              </div>
            </div>
            <div class="inbox_chat scroll">
              <div class="chat_list active_chat">
                <div class="chat_people">
                  <div class="chat_img">
                    {" "}
                    <img
                      src="https://ptetutorials.com/images/user-profile.png"
                      alt="sunil"
                    />{" "}
                  </div>
                  <div class="chat_ib">
                    <h5>
                      Sunil Rajput <span class="chat_date">Dec 25</span>
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
          <div class="mesgs">
            <div class="msg_history">
              {message.map((msg) => (
                <div>
                  {msg.type === "incoming" ? (
                    <div class="incoming_msg">
                      <div class="incoming_msg_img">
                        {" "}
                        <img
                          src="https://ptetutorials.com/images/user-profile.png"
                          alt="sunil"
                        />{" "}
                      </div>
                      <div class="received_msg">
                        <div class="received_withd_msg">
                          <p>{msg.text}</p>
                          <span class="time_date"> {msg.date}</span>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div class="outgoing_msg">
                      <div class="sent_msg">
                        <p>{msg.text}</p>
                        <span class="time_date"> {msg.date}</span>{" "}
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
            <div class="type_msg">
              <div class="input_msg_write">
                <input
                  type="text"
                  class="write_msg"
                  placeholder="Type a message"
                  value={messageInput}
                  onChange={(e) => setMessageInput(e.target.value)}
                />
                <button class="msg_send_btn" type="button" onClick={onSendMsg}>
                  <i class="fa fa-paper-plane" aria-hidden="true"></i>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
