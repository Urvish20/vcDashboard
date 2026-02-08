import { useDispatch } from "react-redux";
import LeftLoginSection from "../components/LeftLoginSection";
import logo from "../assets/logo.svg";
import { setLogin } from "../store/slices/authSlice";
import { useNavigate } from "react-router";
import { CORRECT_PASSWORD, EMAIL } from "../constant";
import { useState } from "react";

const Login = () => {
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const navigate = useNavigate();

  const validateEmail = (value) => {
    return value && value.includes("@");
  };

  const handleLogin = () => {
    setError("");
    setSuccess("");

    if (!validateEmail(email)) {
      setError("Please enter a valid email.");
      return;
    }

    if (email !== EMAIL || password !== CORRECT_PASSWORD) {
      setError("Incorrect email or password.");
      return;
    }

    dispatch(setLogin(email));
    navigate("/otp");
    setSuccess("Logged in successfully.");
  };

  return (
    <div className="flex gap-10 h-screen w-full">
      <div className="py-10 pl-10 h-full w-full">
        <LeftLoginSection />
      </div>
      <div className="flex justify-center flex-col gap-16 items-center h-full w-full max-w-[400px]">
        <img src={logo} alt="logo" />
        <div className="flex flex-col gap-[18px] items-center">
          <p className="text-[24px] font-semibold text-[#6B599C]">
            Log in into your account
          </p>
          <input
            type="text"
            placeholder="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="rounded-[13px] border border-black p-[18px] h-[57px] w-full"
          />
          <input
            type="password"
            placeholder="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="rounded-[13px] border border-black p-[18px] h-[57px] w-full"
          />
          {error && <p className="text-red-600 text-sm">{error}</p>}
          {success && <p className="text-green-600 text-sm">{success}</p>}
          <p className="text-[#ED741B] text-[14px] cursor-pointer">
            Forgot Password?
          </p>
          <button
            onClick={handleLogin}
            className="bg-[#6B599C] cursor-pointer flex justify-center h-[55px] rounded-[18px] w-full items-center text-white"
          >
            Login In
          </button>
          <p className="text-[#6B599C] cursor-pointer">
            Don’t have an account?{" "}
            <span className="text-[#ED741B]">Create Account</span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
