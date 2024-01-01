import React, { useContext, useState } from "react";
import attach from "../images/attach.png";
import img from "../images/img.png";
import { ChatsContext } from "../contexts/chats.context";
import { UserContext } from "../contexts/user.context";
import { db } from "../firebase";
import { updateDoc, doc, arrayUnion } from "firebase/firestore";
function Input() {
  const { data } = useContext(ChatsContext);
  const { currentUser } = useContext(UserContext);
  const [message, setMessage] = useState("");
  const handleSend = async () => {
    console.log(message);
    try {
      await updateDoc(doc(db, "chats", data.chatId), {
        messages: arrayUnion({ uid: currentUser.uid, message: message }),
      });
      setMessage("");
    } catch (err) {
      console.log("Error updating new message ", err);
    }
  };
  return (
    <div className="flex justify-between h-[8vh] items-center">
      <input
        type="text"
        placeholder="Type something..."
        value={message}
        className="w-[100%] h-[8vh] p-4"
        onChange={(e) => setMessage(e.target.value)}
      />
      <div className="flex w-[220px]">
        <input type="file" id="file" className="hidden" />
        <label htmlFor="file">
          <img src={img} alt="img" className="p-1 " />
        </label>

        <img src={attach} alt="attach" className="p-1" />

        <button
          className="h-[40px] w-[60px] px-[10px] bg-indigo-300 m-1"
          onClick={handleSend}
        >
          Send
        </button>
      </div>
    </div>
  );
}

export default Input;
