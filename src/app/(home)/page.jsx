"use client";

import Hero1 from "@/components/hero/Hero1";
import About1 from "@/components/section/About1";
import BrowserCategory1 from "@/components/section/BrowserCategory1";
import CounterInfo1 from "@/components/section/CounterInfo1";
import CtaBanner1 from "@/components/section/CtaBanner1";
import NeedSomething1 from "@/components/section/NeedSomething1";
import OurBlog1 from "@/components/section/OurBlog1";
import OurCta1 from "@/components/section/OurCta1";
import OurPartner1 from "@/components/section/OurPartner1";
import Testimonial1 from "@/components/section/Testimonial1";
import TrendingService1 from "@/components/section/TrendingService1";

import React, { useState, useEffect } from "react";
import signUpStore from "@/store/signUp";
import {
  connectChat,
  disconnectChat,
  sendMessage,
} from "@/services/ChatService";
import { chatMsgDateFormat } from "@/utils/global";

export default function page() {
  const { loggedInUser } = signUpStore();
  const [messageInput, setMessageInput] = useState("");
  const token = loggedInUser?.token;
  const userId = localStorage.getItem("user_profile_id");
  const channel = `/topic/urit/notifications/${userId}`;

  useEffect(() => {
    console.log("token", token);
    if (!token) {
      return;
    }

    connectChat(token, channel, messageReceivedHandler);
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
      <Hero1 />
      <BrowserCategory1 />
      <TrendingService1 />
      <NeedSomething1 />
      <CtaBanner1 />
      <CounterInfo1 />
      <Testimonial1 />
      <About1 />
      <OurBlog1 />
      <OurPartner1 />
      <OurCta1 />
    </>
  );
}
