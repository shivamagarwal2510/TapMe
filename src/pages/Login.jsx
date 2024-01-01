import { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase.js";
import { useNavigate, Link } from "react-router-dom";


const Login = () => {
  const [err, setErr] = useState(false);
  const [errMessage, setErrMessage] = useState("");
  const navigate = useNavigate();
  const onSubmitHandler = async (e) => {
    e.preventDefault();
    // console.log(e.target[0].value);
    const email = e.target[0].value;
    const password = e.target[1].value;
    try {
      const res = await signInWithEmailAndPassword(auth, email, password);
      if (res.user) {
        navigate("/");
      }
      console.log(res);
    } catch (err) {
      console.log(err.message);
      setErr(true);
      setErrMessage(err.message);
    }
  };
  return (
    <>
      <div className="bg-indigo-300 w-[100vw] h-[100vh] pt-[1px] mt-[-1px] flex justify-center align-center">
        <div className="w-[30vw] h-[45vh] bg-white m-auto  rounded-md">
          <p className="text-center font-bold text-2xl pt-[1vh] text-[#5d5b8d]">
            TapMe
          </p>
          <p className="text-center text-gray-400">Login</p>
          <form onSubmit={onSubmitHandler} className="flex flex-col">
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

            <button className=" cursor-pointer text-white rounded block m-auto mt-[4vh] p-2 w-[26vw] bg-indigo-600 hover:bg-indigo-300">
              Sign in
            </button>
          </form>
          <p className="text-center mt-[4vh]">
            You don't have an account? <Link className="text-indigo-400" to="/register">Register</Link>
          </p>
        </div>
      </div>
    </>
  );
};

export default Login;
