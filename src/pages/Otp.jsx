import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import LeftLoginSection from "../components/LeftLoginSection";
import otpLogo from "../assets/otpLogo.svg";
import { CORRECT_OTP } from "../constant";
import { useSelector } from "react-redux";

const Otp = () => {
  const [otp, setOtp] = useState(Array(6).fill(""));
  const [error, setError] = useState("");
  const inputsRef = useRef([]);
  const navigate = useNavigate();
  const loggedEmail = useSelector((state) => state.auth.loggedEmail);

  console.log(loggedEmail);

  const handleChange = (value, index) => {
    if (!/^\d?$/.test(value)) return;

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);
    setError("");

    if (value && index < 5) {
      inputsRef.current[index + 1].focus();
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputsRef.current[index - 1].focus();
    }
  };

  const handleVerify = () => {
    if (otp.join("") === CORRECT_OTP) {
      navigate("/select-avatar");
    } else {
      setError("Invalid OTP. Please try again.");
    }
  };

  return (
    <div className="flex gap-20 h-screen w-full">
      <div className="py-10 pl-10 h-full w-full">
        <LeftLoginSection />
      </div>

      <div className="flex justify-center flex-col gap-16 items-center h-full w-full max-w-[400px]">
        <img src={otpLogo} alt="logo" />

        <div className="flex flex-col gap-6 items-center">
          <p className="text-[24px] font-semibold text-[#6B599C]">
            OTP Verification
          </p>

          <p className="text-center text-black text-sm w-[185px]">
            Enter OTP sent to {loggedEmail}
          </p>

          <div className="flex gap-3">
            {otp.map((digit, index) => (
              <input
                key={index}
                ref={(el) => (inputsRef.current[index] = el)}
                type="text"
                maxLength={1}
                value={digit}
                onChange={(e) => handleChange(e.target.value, index)}
                onKeyDown={(e) => handleKeyDown(e, index)}
                className="w-[48px] h-[48px] text-center text-lg font-semibold
                  border border-gray-300 rounded-lg
                  focus:outline-none focus:border-[#6B599C]"
              />
            ))}
          </div>

          {error && <p className="text-red-500 text-sm">{error}</p>}

          <p className="text-[#ED741B] text-[14px] cursor-pointer">
            Resend OTP
          </p>

          <button
            onClick={handleVerify}
            className="bg-[#6B599C] cursor-pointer h-[55px] rounded-[18px] w-full text-white font-medium"
          >
            Verify
          </button>
        </div>
      </div>
    </div>
  );
};

export default Otp;
