import React, { useContext, useEffect, useState } from "react";
import Message from "./Message.jsx";
import { ChatsContext } from "../contexts/chats.context.jsx";
import { onSnapshot, doc } from "firebase/firestore";
import { db } from "../firebase.js";

function Messages() {
  const { data } = useContext(ChatsContext);
  const [messages, setMessages] = useState([]);
  useEffect(() => {
    const getMessages = () => {
      const unsub = onSnapshot(doc(db, "chats", data.chatId), (doc) => {
        console.log("Messages -> ", Object.entries(doc.data()));
        setMessages(doc.data().messages);
      });
      return () => {
        unsub();
      };
    };
    data.chatId && getMessages();
  }, [data.user, data.chatId]);
  console.log("messages -> ", messages);
  return (
    <div className="bg-[#ddddf7] h-[calc(100%-16vh)] flex flex-col overflow-y-scroll">
      {messages && messages.map((m, i) => <Message message={m} key={i} />)}
    </div>
  );
}

export default Messages;
