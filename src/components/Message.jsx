import React, { useContext } from "react";
import { UserContext } from "../contexts/user.context";
function Message({ message }) {
  const { currentUser } = useContext(UserContext);

  return (
    <>
      {currentUser.uid === message.uid ? (
        <div
          className="ml-auto px-[10px] py-[5px] flex flex-col text-white max-w-[60%] bg-[#676591] m-[5px] mr-[25px] text-wrap rounded-l-xl rounded-t-xl"
          style={{ wordWrap: "break-word" }}
        >
          {message.message}
          <div className="text-xs text-[#c9cbdf] ml-auto p-[4px]">
            {message.time}
          </div>
        </div>
      ) : (
        <div
          className="px-[10px] py-[5px] text-white flex flex-col bg-[#2F2D52] m-[5px] mr-auto max-w-[60%] text-wrap rounded-r-xl rounded-t-xl"
          style={{ wordWrap: "break-word" }}
        >
          {message.message}
          <div className=" text-xs text-[#c9cbdf] mr-auto p-[4px]">
            {message.time}
          </div>
        </div>
      )}
    </>
  );
}

export default Message;
