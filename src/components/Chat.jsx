import React from "react";
import Cam from "../images/cam.png";
import Add from "../images/add.png";
import More from "../images/more.png";
import Messages from "./Messages";
import Input from "./Input.jsx";
import { useContext } from "react";
import { ChatsContext } from "../contexts/chats.context.jsx";
function Chat() {
  const { data } = useContext(ChatsContext);
  console.log("Current Chat data --->", data);
  return (
    <div className="w-[45vw]  h-[80vh]">
      <div className="flex justify-between bg-[#676591] h-[8vh] items-center">
        <div className="rounded-full overflow-hidden  w-[50px] h-[50px] m-2">
          {data.user?.photoURL && <img src={data.user.photoURL} alt="name" />}
        </div>
        <div>
          <span className="p-4 text-gray-300">{data.user?.displayName}</span>
        </div>
        <div className="flex mx-4">
          <img src={Cam} alt="" className="h-[24px]" />
          <img src={Add} alt="" className="h-[24px]" />
          <img src={More} alt="" className="h-[24px] " />
        </div>
      </div>
      <Messages />
      <Input />
    </div>
  );
}

export default Chat;
