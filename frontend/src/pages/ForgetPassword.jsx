import axios from "axios";
import { useState } from "react";
import { IoIosArrowRoundBack } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import { serverUrl } from "../App";

function ForgetPassword() {
  const [step, setStep] = useState(1);
  const [email, setEmail] = useState();
  const [otp, setOtp] = useState();
  const [createPassword, setCreatePassword] = useState();
  const [confirmPassword, setConfirmPassword] = useState();
  const [err, setErr] = useState();
  const navigate = useNavigate();

  // for sending otp step 1
  const handleSendOtp = async () => {
    try {
      const result = await axios.post(
        `${serverUrl}/api/auth/send-otp`,
        { email },
        { withCredentials: true }
      );
      console.log(result);
      setStep(2);
      setErr("");
    } catch (err) {
      setErr(err.response.data.message);
      console.log(err);
    }
  };

  // for verify otp step 2

  const handleVerifyOtp = async () => {
    try {
      const result = await axios.post(
        `${serverUrl}/api/auth/verify-otp`,
        { email, otp },
        { withCredentials: true }
      );
      console.log(result);
      setStep(3);
      setErr("");
    } catch (err) {
      setErr(err.response.data.message);
      console.log(err);
    }
  };

  // reseting password

  const handleResetPassword = async () => {
    if (createPassword != confirmPassword) {
      return null;
    }
    try {
      const result = await axios.post(
        `${serverUrl}/api/auth/reset-password`,
        { email, createPassword },
        { withCredentials: true }
      );
      console.log(result);
      navigate("/signin");
    } catch (err) {
      setErr(err.response.data.message);
      console.log(err);
    }
  };

  return (
    <div className="w-full flex items-center justify-center min-h-screen p-4 bg-[#fff9f6]">
      <div className="bg-white rounded-xl shadow-lg w-full max-w-md p-8">
        <div className="flex items-center gap-2 mb-4">
          <IoIosArrowRoundBack
            size={30}
            className="text-[#ff4d2d] cursor-pointer"
            onClick={() => navigate(-1)}
          />
          <h1 className="font-bold text-center text-[#ff4d2d] text-xl">
            Forget Password
          </h1>
        </div>
        {step == 1 && (
          <div>
            {" "}
            {/* Email */}
            <div className="mb-6">
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
                className="w-full border-[1px] rounded-lg px-3 py-2 focus:outline-none border-gray-200  "
              />
            </div>
            {/* Send otp */}
            <button
              onClick={handleSendOtp}
              className={`w-full font-semibold  py-2  rounded-lg transition duration-200 bg-[#ff4d2d] text-white hover:bg-[#e64323] cursor-pointer`}
            >
              Send OTP
            </button>
            {err && <p className="text-red-500 text-center my-4">{err}</p>}
          </div>
        )}
        {step == 2 && (
          <div>
            {" "}
            {/* Email */}
            <div className="mb-6">
              <label
                htmlFor="otp"
                className="block text-gray-700 font-medium mb-1"
              >
                OTP
              </label>
              <input
                type="otp"
                placeholder="Enter OTP"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                className="w-full border-[1px] rounded-lg px-3 py-2 focus:outline-none border-gray-200  "
              />
            </div>
            {/* verify */}
            <button
              onClick={handleVerifyOtp}
              className={`w-full font-semibold  py-2  rounded-lg transition duration-200 bg-[#ff4d2d] text-white hover:bg-[#e64323] cursor-pointer`}
            >
              Verify
            </button>
            {err && <p className="text-red-500 text-center my-4">{err}</p>}
          </div>
        )}
        {step == 3 && (
          <div>
            {/* newPassword Create */}
            <div className="mb-6">
              <label
                htmlFor="newPassword"
                className="block text-gray-700 font-medium mb-1"
              >
                Create Password
              </label>
              <input
                type="password"
                placeholder="Create password"
                value={createPassword}
                onChange={(e) => setCreatePassword(e.target.value)}
                className="w-full border-[1px] rounded-lg px-3 py-2 focus:outline-none border-gray-200  "
              />
            </div>
            {/* newPassword Confirm */}
            <div className="mb-6">
              <label
                htmlFor="confirmPassword"
                className="block text-gray-700 font-medium mb-1"
              >
                Confirm Password
              </label>
              <input
                type="password"
                placeholder="Confirm password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="w-full border-[1px] rounded-lg px-3 py-2 focus:outline-none border-gray-200  "
              />
            </div>

            {/* verify */}
            <button
              onClick={handleResetPassword}
              className={`w-full font-semibold  py-2  rounded-lg transition duration-200 bg-[#ff4d2d] text-white hover:bg-[#e64323] cursor-pointer`}
            >
              Reset Password
            </button>
            {err && <p className="text-red-500 text-center my-4">{err}</p>}
          </div>
        )}
      </div>
    </div>
  );
}

export default ForgetPassword;
