import add from "../images/addAvatar.png";
import { useState } from "react";
import { auth, storage, db } from "../firebase.js";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { doc, setDoc } from "firebase/firestore";
import { useNavigate, Link } from "react-router-dom";

const Register = () => {
  const [err, setErr] = useState(false);
  const [errMessage, setErrMessage] = useState("");
  const navigate = useNavigate();

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    // console.log(e.target[0].value);
    const displayName = e.target[0].value;
    const email = e.target[1].value;
    const password = e.target[2].value;
    const file = e.target[3].files[0];

    try {
      const res = await createUserWithEmailAndPassword(auth, email, password);

      const date = new Date().getTime();
      const storageRef = ref(storage, `${displayName + date}.png`);
      const uploadTask = uploadBytesResumable(storageRef, file);
      uploadTask.on(
        (error) => {
          // Handle unsuccessful uploads
          console.log("error uploading image", error.message);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
            // console.log(displayName);
            console.log("url of image ", downloadURL);
            await updateProfile(res.user, {
              displayName: displayName,
              photoURL: downloadURL,
            });
            await setDoc(doc(db, "users", res.user.uid), {
              uid: res.user.uid,
              displayName: displayName,
              email,
              photoURL: downloadURL,
            });
            await setDoc(doc(db, "userChats", res.user.uid), {});
            navigate("/");
          });
        }
      );
      // if (res.user) {
      //   navigate("/");
      // }

      console.log(res);
    } catch (err) {
      console.log("error while creating user", err.message);
      setErr(true);
      setErrMessage(err.message);
    }
  };
  return (
    <>
      <div className="bg-indigo-300 w-[100vw] h-[100vh] flex justify-center align-center">
        <div className="w-[30vw] h-[64vh] bg-white m-auto rounded-md">
          <p className="text-center font-bold text-2xl pt-[1vh] text-[#5d5b8d]">
            TapMe
          </p>
          <p className="text-center text-gray-400">Register</p>
          <form onSubmit={onSubmitHandler} className="flex flex-col">
            <input
              type="text"
              placeholder="display name"
              className="mx-[2vw] mt-[4vh] border-b-2 border-gray-400 focus:border-indigo-600 "
            />
            <input
              type="email"
              placeholder="email"
              className="mx-[2vw] mt-[4vh] border-b-2 border-gray-400 focus:border-indigo-600"
            />
            <input
              type="password"
              placeholder="password"
              className="mx-[2vw] mt-[4vh] border-b-2 border-gray-400 focus:border-indigo-600"
            />
            <input type="file" className="hidden" id="file" />
            <label
              htmlFor="file"
              className="mx-[2vw] mt-[4vh] text-indigo-300 "
            >
              <img src={add} alt="avatar" className="w-[2.5vw] inline" /> Add an
              avatar
            </label>
            <button className=" cursor-pointer text-white rounded block m-auto mt-[4vh] p-2 w-[26vw] bg-indigo-600 hover:bg-indigo-300">
              Sign up
            </button>
          </form>
          <p className="text-center mt-[4vh]">
            You do have an account?{" "}
            <Link className="text-indigo-400" to="/login">
              Login
            </Link>
          </p>
          {err && <span>{errMessage}</span>}
        </div>
      </div>
    </>
  );
};
export default Register;
