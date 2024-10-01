import Link from "next/link";
import globalMixin from "@/mixins/global";
import signUpStore from "@/store/signUp";
import { dateInStringFormat } from "@/utils/global";
import {
  connectChat,
  disconnectChat,
  sendMessage,
} from "@/services/ChatService";
import { useEffect, useRef, useState } from "react";
import moment from "moment";
import { chatMsgItemDateFormat } from "@/utils/global";
import { useParams } from "next/navigation";
import chatStore from "@/store/chat";

export default function FreelancerAbout1({ provider }) {
  const { id } = useParams();
  const { loggedInUser } = signUpStore();
  const { getCountry, getGender, getLanguage, getLanguageLevel } =
    globalMixin();
  const { getProjectChat } = chatStore();

  const [messageInput, setMessageInput] = useState("");
  const messagesEndRef = useRef(null);
  let client = null;
  const token = loggedInUser?.token;
  const channel = `/topic/urit/chat/${loggedInUser?.userId}`;
  const [chats, setChats] = useState([]);
  const [newChat, setNewChat] = useState(null);

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
    getChat();
  }, []);

  useEffect(() => {
    if (newChat) {
      setChatsList(newChat);
    }
  }, [newChat]);

  const getChat = async () => {
    const result = await getProjectChat({
      pageNumber: 0,
      pageSize: 10,
      chatType: "Direct Chat",
      userId: id,
    });
    console.log("result", result);
    if (result) {
      const updatedMsgs = result.messages.map((msg) => ({
        ...msg,
        type: msg.senderId === loggedInUser?.userId ? "outgoing" : "incoming",
        name: msg.senderName,
      }));
      setChats(updatedMsgs.reverse());
    }
  };

  const messageReceivedHandler = (msg) => {
    setNewChat(msg);
  };

  const setChatsList = () => {
    const obj = {
      text: newChat.text,
      dateTime: newChat.createdAt,
      type: "incoming",
      name: newChat.senderName,
    };

    const prevChats = [...chats];
    console.log("messageReceivedHandler ~ prevChats:", prevChats);
    setChats([...prevChats, obj]);
    setScrolToBottom();
  };

  const onSendMsg = () => {
    sendMessage({
      msg: messageInput,
      senderId: loggedInUser.userId,
      chatType: "Direct Chat",
      receiverId: id,
    });
    setMessageInput("");
    setScrolToBottom();
    onSetChat();
  };

  const onSetChat = () => {
    const msg = {
      text: messageInput,
      dateTime: moment(),
      type: "outgoing",
      name: loggedInUser.name,
    };

    const prevChats = [...chats];
    setChats([...prevChats, msg]);
  };

  const setScrolToBottom = () => {
    setTimeout(() => {
      if (messagesEndRef.current) {
        messagesEndRef.current.scrollTop = messagesEndRef.current.scrollHeight;
      }
    }, 100);
  };

  return (
    <>
      <div className="price-widget pt25 bdrs8">
        <h3 className="widget-title">
          ${provider.hourlyRate}
          <small className="fz15 fw500">/per hour</small>
        </h3>
        <div className="category-list mt20">
          <a className="d-flex align-items-center justify-content-between bdrb1 pb-2">
            <span className="text">
              <i className="flaticon-place text-thm2 pe-2 vam" />
              Location
            </span>
            <span>
              {" "}
              {getCountry(provider.country)}, {provider.city}
            </span>
          </a>
          <a className="d-flex align-items-center justify-content-between bdrb1 pb-2">
            <span className="text">
              <i className="flaticon-30-days text-thm2 pe-2 vam" />
              Member since
            </span>
            <span>{dateInStringFormat(provider.createdAt)}</span>
          </a>
          <a className="d-flex align-items-center justify-content-between bdrb1 pb-2">
            <span className="text">
              <i className="flaticon-calendar text-thm2 pe-2 vam" />
              Last Delivery
            </span>
            <span>5 days</span>
          </a>
          <a className="d-flex align-items-center justify-content-between bdrb1 pb-2">
            <span className="text">
              <i className="flaticon-mars text-thm2 pe-2 vam" />
              Gender
            </span>
            <span>{getGender(provider.gender)}</span>
          </a>
          <a className="d-flex align-items-center justify-content-between bdrb1 pb-2">
            <span className="text">
              <i className="flaticon-translator text-thm2 pe-2 vam" />
              Languages
            </span>
            <span>{getLanguage(provider.language)}</span>
          </a>
          <a className="d-flex align-items-center justify-content-between mb-3">
            <span className="text">
              <i className="flaticon-sliders text-thm2 pe-2 vam" />
              English Level
            </span>
            <span>{getLanguageLevel(provider.languageLevel)}</span>
          </a>
        </div>

        <div className="messaging freelancer-chat">
          <div className="inbox_msg">
            <div className="mesgs freelancer-chat-msg-width">
              <div className="msg_history" ref={messagesEndRef}>
                {chats.map((msg, index) => (
                  <div key={index}>
                    {msg.type === "incoming" ? (
                      <div className="incoming_msg mt10">
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
        {/* <div className="d-grid">
          <Link href="/contact" className="ud-btn btn-thm">
            Contact Me
            <i className="fal fa-arrow-right-long" />
          </Link>
        </div> */}
      </div>
    </>
  );
}
