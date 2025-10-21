import axios from "axios";
import { useState } from "react";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { useNavigate } from "react-router-dom";
import { serverUrl } from "../App";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { auth } from "../../firbase";
import { useDispatch } from "react-redux";
import { setUserData } from "../redux/userSlice";

function SignIn() {
  const primaryColor = "#ff4d2d";
  //   const hoverColor = "#e64323";
  const bgColor = "#fff9f6";
  const borderColor = "#ddd";
  const [showPassword, setshowPassord] = useState(false);
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [err, setErr] = useState();
  const dispatch = useDispatch();

  const handleSignIn = async () => {
    try {
      const result = await axios.post(
        `${serverUrl}/api/auth/signin`,
        {
          email,
          password,
        },
        { withCredentials: true }
      );
      setErr("");
      dispatch(setUserData(result.data));
    } catch (err) {
      setErr(err.response.data.message);
      console.log(err.response?.data || err.message);
    }
  };

  /// Sigining with google

  const handleGoogleAuth = async () => {
    const provider = new GoogleAuthProvider();
    const result = await signInWithPopup(auth, provider);

    try {
      const { data } = await axios.post(
        `${serverUrl}/api/auth/google-auth`,
        {
          email: result.user.email,
        },
        { withCredentials: true }
      );
      setErr("");
      dispatch(setUserData(data));
    } catch (err) {
      setErr(err.response.data.message);
      console.log(err.response?.data || err.message);
    }
  };

  return (
    <div
      className="min-h-screen w-full flex items-centre justify-center p-4"
      style={{ backgroundColor: bgColor }}
    >
      <div
        className={ `h-full bg-white rounded-xl shawdow-lg w-full max-w-md p-8 border-[1px] `}
        style={{ border: `1px solid ${borderColor}` }}
      >
        <h1
          className={`text-3xl font-bold mb-2 `}
          style={{ color: primaryColor }}
        >
          Feastly
        </h1>
        <p className="text-gray-600 mb-8">
          Sign In to your account to get started with delicious food deliveries
        </p>

        {/* Email */}
        <div className="mb-4">
          <label
            htmlFor="email"
            className="block text-gray-700 font-medium mb-1"
          >
            Email
          </label>
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full border rounded-lg px-3 py-2 focus:outline-none "
            style={{ border: `1px solid ${borderColor}` }}
            required
          />
        </div>

        {/* Password */}
        <div className="mb-4">
          <label
            htmlFor="password"
            className="block text-gray-700 font-medium mb-1"
          >
            Password
          </label>
          <div className="relative">
            <input
              type={`${showPassword ? "text" : "password"}`}
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full border rounded-lg px-3 py-2 focus:outline-none "
              style={{ border: `1px solid ${borderColor}` }}
              required
            />
            <button
              onClick={() => setshowPassord((prev) => !prev)}
              className="cursor-pointer absolute right-3 top-2.5 text-gray-500"
            >
              {!showPassword ? <FaRegEye /> : <FaRegEyeSlash />}
            </button>
          </div>
        </div>

        {/* Forget Password */}

        <div
          className="mb-4 text-right text-[#ff4d3d] cursor-pointer"
          onClick={() => navigate("/forget-password")}
        >
          Forget Password
        </div>

        {/* Sign In button */}

        <button
          onClick={handleSignIn}
          className={`w-full font-semibold  py-2  rounded-lg transition duration-200 bg-[#ff4d2d] text-white hover:bg-[#e64323] cursor-pointer`}
        >
          Sign In
        </button>
        {err && <p className="text-red-500 text-center my-4">{err}</p>}
        {/* Sigin with google */}

        <button
          onClick={handleGoogleAuth}
          className="cursor-pointer w-full mt-4 flex items-center justify-center gap-2 border rounded-lg px-4 py-2 transition duration-200 border-gray-400 hover:bg-gray-200"
        >
          <FcGoogle size={20} />
          <span>Sign in with google </span>
        </button>

        <p className="cursor-pointer text-center mt-6">
          Want to create a new account ? {""}
          <span onClick={() => navigate("/signup")} className="text-[#ff4d2d]">
            Sign Up
          </span>
        </p>
      </div>
    </div>
  );
}

export default SignIn;
