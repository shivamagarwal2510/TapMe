import React, { useContext } from "react";

import { signOut } from "firebase/auth";
import { auth } from "../firebase.js";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../contexts/user.context.jsx";
function Navbar() {
  const { currentUser } = useContext(UserContext);
  console.log("my current user data", currentUser);
  const navigate = useNavigate();
  return (
    <div className="flex justify-between bg-[#2f2d52] h-[8vh] items-center">
      <span className="text-indigo-200 ml-[1vw] text-xl font-bold">TapMe</span>
      <div className="flex items-center">
        <div className="rounded-full overflow-hidden  w-[30px] h-[30px]">
          {currentUser.photoURL && (
            <img src={currentUser.photoURL} alt="name" />
          )}
        </div>
        {currentUser.displayName && (
          <span className="ml-[0.5vw] text-white">
            {currentUser.displayName}
          </span>
        )}
        <button
          onClick={() => {
            signOut(auth)
              .then(() => {
                // Sign-out successful.
                console.log("signed out");
                navigate("/register");
              })
              .catch((error) => {
                // An error happened.
                console.log(error.message);
              });
          }}
          className="mx-[0.5vw] w-[5vw] h-[4.5vh] bg-[#3e3c61] text-white rounded"
        >
          Logout
        </button>
      </div>
    </div>
  );
}

export default Navbar;
