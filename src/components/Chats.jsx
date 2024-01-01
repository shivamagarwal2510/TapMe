import React, { useEffect, useState, useContext } from "react";
import { db } from "../firebase";
import { doc, onSnapshot } from "firebase/firestore";
import { UserContext } from "../contexts/user.context";
import { ChatsContext } from "../contexts/chats.context";
function Chats() {
  const [users, setUsers] = useState(null);
  const { currentUser } = useContext(UserContext);
  const { dispatch } = useContext(ChatsContext);

  useEffect(() => {
    const getUsers = () => {
      const unsub = onSnapshot(doc(db, "userChats", currentUser.uid), (doc) => {
        console.log("my friends -> ", Object.entries(doc.data()));
        setUsers(Object.entries(doc.data()));
        // console.log(users[0][1].userInfo.displayName);
      });
      return () => {
        unsub();
      };
    };
    currentUser.uid && getUsers();
  }, [currentUser.uid]);

  const handleSelect = (u) => {
    console.log("handle select called ", u);
    dispatch({ type: "CHANGE_USER", payload: u });
  };

  return (
    <div>
      {users?.map((user) => (
        <div
          className="flex items-center text-white hover:bg-[#2f2d52] cursor-pointer"
          key={user[0]}
          onClick={() => handleSelect(user[1].userInfo)}
        >
          <div className="rounded-full overflow-hidden  w-[50px] h-[50px] m-2">
            <img src={user[1].userInfo.photoURL} alt="name" />
          </div>
          <div className="leading-[0px]">
            <p className="text-lg font-medium">
              {user[1].userInfo.displayName}
            </p>
            <span className="text-xs"> {user[1].userInfo.lastMessage}</span>
          </div>
        </div>
      ))}
    </div>
  );
}

export default Chats;
