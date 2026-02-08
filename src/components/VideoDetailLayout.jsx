import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import Header from "./Header";
import Sidebar from "./Sidebar";
import AddVideoModal from "./AddVideoModal";
import { logout } from "../store/slices/authSlice";
import logo from "../assets/logo.svg";
import VideoDetailPage from "../pages/VideoDetailPage";

const VideoDetailLayout = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isAddVideoModalOpen, setIsAddVideoModalOpen] = useState(false);

  const handleLogout = () => {
    dispatch(logout());
    navigate("/login");
  };

  return (
    <div className="flex h-screen w-full flex-col bg-white">
      <Header
        logoSrc={logo}
        onLogout={handleLogout}
        onAddVideoClick={() => setIsAddVideoModalOpen(true)}
      />
      <div className="flex flex-1">
        <Sidebar onSelectCategory={() => {}} />
        <VideoDetailPage />
      </div>
      <AddVideoModal
        isOpen={isAddVideoModalOpen}
        onClose={() => setIsAddVideoModalOpen(false)}
      />
    </div>
  );
};

export default VideoDetailLayout;
