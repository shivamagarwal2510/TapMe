import React, { useState, useContext } from "react";
import {
  collection,
  query,
  where,
  getDoc,
  doc,
  setDoc,
  getDocs,
  updateDoc,
  serverTimestamp,
} from "firebase/firestore";
import {} from "firebase/firestore";
import { db } from "../firebase.js";
import { UserContext } from "../contexts/user.context.jsx";
import { ChatsContext } from "../contexts/chats.context.jsx";

function Search() {
  const [inputUser, setInputUser] = useState("");
  const [user, setUser] = useState(null);
  const [noUserFound, setNoUserFound] = useState(false);
  const [err, setErr] = useState(false);
  const { currentUser } = useContext(UserContext);
  const { dispatch } = useContext(ChatsContext);
  const handleSearch = async () => {
    const UsersRef = collection(db, "users");
    const q = query(
      UsersRef,
      where("displayName", "==", inputUser.toLocaleLowerCase())
    );
    try {
      const querySnapshot = await getDocs(q);
      if (querySnapshot.empty) {
        setNoUserFound(true);
        setUser(null);
      } else {
        setNoUserFound(false);
      }
      console.log("query snapshot --->", querySnapshot);
      querySnapshot.forEach((doc) => {
        // doc.data() is never undefined for query doc snapshots
        console.log(doc.id, " => ", doc.data());
        setUser(doc.data());
      });
    } catch (err) {
      setErr(true);
    }
  };
  const handleEnter = (e) => {
    e.code === "Enter" && handleSearch();
  };

  const handleSelect = async (u) => {
    console.log("handle select called ", u);
    const combinedId =
      currentUser.uid > user.uid
        ? currentUser.uid + user.uid
        : user.uid + currentUser.uid;
    try {
      const res = await getDoc(doc(db, "chats", combinedId));
      console.log("Chat result", res);
      if (!res.exists()) {
        console.log("Creating new chat");

        // Creating new Chat
        await setDoc(doc(db, "chats", combinedId), { messages: [] });

        // Updating user chats

        // user.uid:{
        //   combinedId:{
        //     userInfo: {displayName, img, id},
        //     lastMessage:"",
        //     Date:,
        //   }
        // }
        await updateDoc(doc(db, "userChats", currentUser.uid), {
          [combinedId + ".userInfo"]: {
            displayName: user.displayName,
            photoURL: user.photoURL,
            uid: user.uid,
          },
          [combinedId + ".date"]: serverTimestamp(),
        });
        await updateDoc(doc(db, "userChats", user.uid), {
          [combinedId + ".userInfo"]: {
            displayName: currentUser.displayName,
            photoURL: currentUser.photoURL,
            uid: currentUser.uid,
          },
          [combinedId + ".date"]: serverTimestamp(),
        });
      }
      dispatch({ type: "CHANGE_USER", payload: u });
    } catch (err) {
      console.log("Error while creating chat", err);
    }

    setUser(null);
    setInputUser("");
  };
  return (
    <div>
      <input
        type="text"
        placeholder="Find a User"
        className="w-[100%] bg-transparent py-2 px-4 border-b-[0.5px] border-[#57576e] text-[#9e9eb1]"
        onChange={(e) => {
          setInputUser(e.target.value);
        }}
        onKeyDown={handleEnter}
        value={inputUser}
      />
      {(err || noUserFound) && (
        <div className="text-white text-center">
          <span>User not found! </span>
        </div>
      )}
      {user && (
        <div className="border-b-[0.5px]" onClick={() => handleSelect(user)}>
          <div className="flex items-center text-white hover:bg-[#2f2d52] cursor-pointer">
            <div className="rounded-full overflow-hidden  w-[50px] h-[50px] m-2">
              <img src={user.photoURL} alt="name" />
            </div>
            <div className="leading-[0px]">
              <p className="text-lg font-medium">{user.displayName}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Search;
