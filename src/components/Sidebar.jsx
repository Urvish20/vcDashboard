import { useState } from "react";
import blackbox from "../assets/blackbox.svg";
import boy from "../assets/boy.svg";
import group from "../assets/group.svg";

const Sidebar = ({ onSelectCategory }) => {
  const [selectedCategoryIdx, setSelectedCategoryIdx] = useState(null);

  const categories = [
    { id: 1, name: "Drôle de récitateur", icon: group },
    { id: 2, name: "Mission sourate", icon: boy },
    { id: 3, name: "Tafsir mystery", icon: blackbox },
    { id: 4, name: "Moushaf décodé", icon: blackbox },
  ];

  const handleSelectCategory = (idx) => {
    setSelectedCategoryIdx(idx);
    onSelectCategory && onSelectCategory(categories[idx]);
  };

  return (
    <aside className="w-32 bg-white border-r pl-10 border-gray-200 mb-10 rounded-bl-2xl pt-5 pr-5 flex flex-col gap-14 overflow-y-auto">
      {categories.map((category, idx) => (
        <button
          key={category.id}
          onClick={() => handleSelectCategory(idx)}
          className={`text-center p-3 rounded-full text-2xl cursor-pointer ${
            selectedCategoryIdx === idx
              ? "bg-linear-to-br from-purple-400 to-orange-400 scale-110"
              : "bg-gray-100 hover:bg-gray-200"
          } transition-all`}
          title={category.name}
        >
          <img src={category.icon} alt={category?.name} />
        </button>
      ))}
    </aside>
  );
};

export default Sidebar;
