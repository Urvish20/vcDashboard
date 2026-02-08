import { useState } from "react";
import logo from "../assets/logo.svg";
import avatar1 from "../assets/Avatar.svg";
import avatar2 from "../assets/Avatar1.svg";
import avatar3 from "../assets/Avatar4.svg";
import avatar4 from "../assets/Avatar3.svg";
import { useNavigate } from "react-router";

const avatars = [
  { id: 1, img: avatar1 },
  { id: 2, img: avatar2 },
  { id: 3, img: avatar3 },
  { id: 4, img: avatar4 },
];

const SelectAvatar = () => {
  const [selected, setSelected] = useState(null);

  const navigate = useNavigate();

  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-center px-6 text-center">
      <img src={logo} alt="logo" className="w-[140px] mb-6" />

      <h1 className="text-2xl sm:text-3xl font-bold mb-2">
        Hé ! MA SOURATE PAS À PAS
      </h1>

      <p className="text-gray-700 max-w-xl mb-10">
        sélectionnez le profil que vous souhaitez continuer.
      </p>

      <div className="flex flex-wrap justify-center gap-6 mb-8">
        {avatars.map((avatar) => (
          <div
            key={avatar.id}
            onClick={() => {
              setSelected(avatar.id);
              navigate("/");
            }}
            className={`w-[90px] h-[90px] sm:w-[100px] sm:h-[100px] rounded-full 
              flex items-center justify-center cursor-pointer transition-all
              ${
                selected === avatar.id
                  ? "ring-4 ring-[#6B599C] scale-105"
                  : "hover:scale-105"
              }`}
          >
            <img
              src={avatar.img}
              alt="avatar"
              className="w-full h-full rounded-full object-cover"
            />
          </div>
        ))}
      </div>

      <button className="flex items-center gap-2 text-[#ED741B] font-medium">
        <span className="text-xl">+</span> Add Profile
      </button>
    </div>
  );
};

export default SelectAvatar;
