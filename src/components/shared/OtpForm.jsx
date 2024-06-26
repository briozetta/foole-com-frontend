import React, { useState, useRef, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";

export default function OtpForm() {
  const [otp, setOtp] = useState(Array(6).fill(""));
  const [loading, setLoading] = useState(false);
  const [resendCooldown, setResendCooldown] = useState(300); // 30 seconds cooldown
  const [resendLoading, setResendLoading] = useState(false);
  const [resendMessage, setResendMessage] = useState("");
  const inputRefs = useRef([]);
  const navigate = useNavigate();
  const location = useLocation();
  const fEmail = location.state?.fEmail;
  const resetPassEmail = location.state?.resetPassEmail;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    let purpose = "verifySignup"
    if(resetPassEmail){
      purpose = "forgotPassVerify"
    }
    try {
      const otpCode = otp.join("");
      const { data } = await axios.post("/verify-email", { otp: otpCode,email:fEmail||resetPassEmail,purpose });

      if (data && fEmail) {
        navigate("/sign-in");
      } else if (data && resetPassEmail){
        navigate("/reset-password/reset", { state: { resetPassEmail, otpCode } })
      }
    } catch (error) {
      console.error("Error verifying email:", error);
      // Handle request error
    } finally {
      setLoading(false);
    }
  };

  useEffect(()=>{console.log(location);},[])

  const handleInputChange = (e, index) => {
    const { value } = e.target;
    if (/^[0-9]$/.test(value) || value === "") {
      setOtp((prevOtp) => {
        const newOtp = [...prevOtp];
        newOtp[index] = value;
        return newOtp;
      });

      if (value !== "" && index < 5) {
        inputRefs.current[index + 1].focus();
      }
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace" && otp[index] === "") {
      if (index > 0) {
        inputRefs.current[index - 1].focus();
      }
    }
  };

  const handleResendOtp = async () => {
    setResendLoading(true);
    try {
      const { data } = await axios.post("/resend-otp",{email:fEmail || resetPassEmail});
      if (data.success) {
        setResendMessage("OTP resent successfully.");
        setResendCooldown(300); // Reset cooldown to 30 seconds
      } else {
        setResendMessage("Failed to resend OTP. Please try again.");
      }
    } catch (error) {
      console.error("Error resending OTP:", error);
      setResendMessage("Error resending OTP. Please try again.");
    } finally {
      setResendLoading(false);
    }
  };

  React.useEffect(() => {
    let timer;
    if (resendCooldown > 0) {
      timer = setInterval(() => {
        setResendCooldown((prev) => prev - 1);
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [resendCooldown]);

  return (
    <div className="relative flex min-h-screen flex-col justify-center overflow-hidden bg-gray-50 py-12">
      <div className="relative bg-white px-6 pt-10 pb-9 shadow-lg shadow-darker-gray-light mx-auto w-full max-w-lg rounded-2xl">
        <div className="mx-auto flex w-full max-w-md flex-col space-y-16">
          <div className="flex flex-col items-center justify-center text-center space-y-2">
            <p className="font-bold text-darker-gray text-2xl">Email Verification</p>
            <div className="flex flex-row text-sm font-medium text-gray-400">
              <p >We have sent a code to your email <span className="text-darker-gray-medium">{fEmail || resetPassEmail}</span></p>
            </div>
          </div>
          <div>
            <form onSubmit={handleSubmit}>
              <div className="flex flex-col space-y-16">
                <div className="flex flex-row items-center justify-between mx-auto w-full max-w-md">
                  {otp.map((digit, index) => (
                    <div key={index} className="w-16 h-16">
                      <input
                        className="w-full h-full flex flex-col items-center justify-center text-center px-5 outline-none rounded-xl border-2 border-gray-300 text-lg bg-white focus:bg-gray-50 focus:ring-1 ring-blue-700"
                        type="text"
                        maxLength="1"
                        value={digit}
                        onChange={(e) => handleInputChange(e, index)}
                        onKeyDown={(e) => handleKeyDown(e, index)}
                        ref={(el) => (inputRefs.current[index] = el)}
                      />
                    </div>
                  ))}
                </div>
                <div className="flex flex-col space-y-5">
                  <div>
                    <button
                      type="submit"
                      className={`flex flex-row items-center justify-center text-center w-full border rounded-xl outline-none py-5 bg-darker-gray border-none text-white text-sm shadow-sm ${
                        loading ? "opacity-50 cursor-not-allowed" : ""
                      }`}
                      disabled={loading}
                    >
                      {loading ? (
                        <svg
                          className="animate-spin h-5 w-5 text-white"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                        >
                          <circle
                            className="opacity-25"
                            cx="12"
                            cy="12"
                            r="10"
                            stroke="currentColor"
                            strokeWidth="4"
                          ></circle>
                          <path
                            className="opacity-75"
                            fill="currentColor"
                            d="M4 12a8 8 0 018-8v8z"
                          ></path>
                        </svg>
                      ) : (
                        "Verify Account"
                      )}
                    </button>
                  </div>
                  <div className="flex flex-col items-center justify-center text-center text-sm font-medium space-y-1 text-gray-500">
                    <p>Didn't receive code?</p>
                    <button
                      onClick={handleResendOtp}
                      className={`flex flex-row items-center text-blue-600 ${
                        resendCooldown > 0 ? "opacity-50 cursor-not-allowed" : ""
                      }`}
                      disabled={resendCooldown > 0 || resendLoading}
                    >
                      {resendLoading ? (
                        <svg
                          className="animate-spin h-5 w-5 text-blue-600"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                        >
                          <circle
                            className="opacity-25"
                            cx="12"
                            cy="12"
                            r="10"
                            stroke="currentColor"
                            strokeWidth="4"
                          ></circle>
                          <path
                            className="opacity-75"
                            fill="currentColor"
                            d="M4 12a8 8 0 018-8v8z"
                          ></path>
                        </svg>
                      ) : (
                        `Resend ${resendCooldown > 0 ? `(${resendCooldown}s)` : ""}`
                      )}
                    </button>
                    {resendMessage && <p className="text-xs text-green-500">{resendMessage}</p>}
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
