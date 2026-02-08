import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/login";
import Otp from "./pages/Otp";
import SelectAvatar from "./pages/SelectAvatar";
import DashboardLayout from "./components/DashboardLayout";
import VideoDetailLayout from "./components/VideoDetailLayout";
import PrivateRoute from "./components/PrivateRoute";
import { useSelector } from "react-redux";

function App() {
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);

  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route element={<PrivateRoute isLoggedIn={isLoggedIn} />}>
          <Route path="/" element={<DashboardLayout />} />
          <Route path="/video/:id" element={<VideoDetailLayout />} />
          <Route path="/otp" element={<Otp />} />
          <Route path="/select-avatar" element={<SelectAvatar />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
