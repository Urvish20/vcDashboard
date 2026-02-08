import { useState, useRef, useEffect } from "react";

const Header = ({ logoSrc, selectedAvatar, onLogout, onAddVideoClick }) => {
  const [open, setOpen] = useState(false);
  const ref = useRef();

  useEffect(() => {
    const onDoc = (e) => {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false);
    };
    document.addEventListener("click", onDoc);
    return () => document.removeEventListener("click", onDoc);
  }, []);

  return (
    <header className="flex items-center justify-between p-4 bg-white  rounded-tr-2xl rounded-tl-2xl">
      <div className="flex items-center gap-3">
        {logoSrc ? (
          <img src={logoSrc} alt="logo" className="h-10 w-auto" />
        ) : (
          <div className="text-lg font-semibold">App</div>
        )}
      </div>

      <div className="flex items-center gap-4">
        <button
          onClick={onAddVideoClick}
          className="px-4 py-2 cursor-pointer bg-linear-to-r from-purple-500 to-orange-400 text-white rounded-lg font-medium hover:shadow-lg transition-all"
        >
          + Add Video
        </button>

        <div className="relative" ref={ref}>
          <button
            onClick={() => setOpen((v) => !v)}
            className="flex items-center gap-2 bg-white rounded-full p-1 hover:shadow-md"
          >
            {selectedAvatar ? (
              <img
                src={selectedAvatar.src}
                alt={selectedAvatar.name}
                className="h-10 w-10 rounded-full object-cover"
              />
            ) : (
              <div className="h-10 w-10 rounded-full bg-gray-300 flex items-center justify-center">
                <span className="text-sm">A</span>
              </div>
            )}
          </button>

          {open && (
            <div className="absolute right-0 mt-2 w-40 bg-white border rounded-lg shadow-md z-20">
              <button
                onClick={() => {
                  setOpen(false);
                  onLogout && onLogout();
                }}
                className="w-full text-left px-4 py-2 cursor-pointer"
              >
                Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
