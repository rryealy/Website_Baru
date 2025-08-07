import { createContext, useContext, useState } from "react"
import { useNavigate, useLocation } from "react-router-dom"
import { GoSidebarExpand, GoSidebarCollapse } from "react-icons/go"

const SidebarContext = createContext();

export default function Navigasi({ children }) {
  const [expanded, setExpanded] = useState(true);

  return (
    <>
      <aside className="h-screen relative">
        <nav className="h-full flex flex-col bg-cemilque shadow-sm p-2">
          <nav className="flex flex-row justify-between items-center px-3 py-2 bg-cemilque-primary">
            
            {/* Kiri: Logo dan Teks */}
            <div className={`flex items-center gap-3 ${
              expanded ? "pr-12 rounded-md p-2" : ""}`}
            >
              <img
                src="public/cemilque-maskot.png"
                alt="Cemilque Logo"
                className={`overflow-hidden transition-all duration-300 ${
                  expanded ? "w-10" : "w-0"
                }`}
              />
              {expanded && (
                <span className="font-bold text-[20px] text-white transition-all duration-300">
                  CEMILQUE
                </span>
              )}
            </div>

            {/* Kanan: Tombol toggle */}
            <button
              onClick={() => setExpanded((curr) => !curr)}
              className={`p-1 rounded-[5px] bg-button-light hover:bg-[#999999] transition-colors duration-200 shadow-md 
              ${expanded ? "" : "mr-1.5"}`}
            >
              {expanded ? <GoSidebarExpand size={20} strokeWidth={0.5} /> : <GoSidebarCollapse size={24} strokeWidth={0.5} />}
            </button>
          </nav>
          
          {/* page lists */}
          <SidebarContext.Provider value={{ expanded }}>
            <ul className="flex-1 px-3">{ children }</ul>
          </SidebarContext.Provider>

        </nav>
      </aside>
    </>
  );
}

export function NavigasiTujuan({ icon, text, path, alert, onClick }) {
  const { expanded } = useContext(SidebarContext);
  const navigate = useNavigate();
  const location = useLocation();

  const active = location.pathname === path;

  const handleClick = () => {
    if (onClick) {
      onClick();
    }
    if (path) {
      navigate(path);
    }
  };

  return (
    <li
      onClick={handleClick}
      className={`relative flex items-center px-3 my-2
        rounded-md cursor-pointer transition-colors group ${
          active
            ? "bg-white text-cemilque font-bold"
            : "hover:bg-cemilque-hover text-white font-medium"
        }`}
    >
      {icon}
      <span
        className={`overflow-hidden transition-all ${
          expanded ? "w-52 ml-3 py-3" : "w-0 py-2.5"
        }`}
      >
      {text}
      </span>
      {alert && (
        <div
          className={`absolute right-2 w-2 h-2 rounded bg-indigo-400 ${
            expanded ? "" : "top-2"
          }`}
        ></div>
      )}

      {!expanded && (
        <div
          className={`absolute left-full rounded-md px-2 py-1 ml-2
            bg-indigo-100 text-indigo-800 text-sm invisible opacity-20
            -translate-x-3 transition-all group-hover:visible 
            group-hover:opacity-100 group-hover:translate-x-0`}
        >
          {text}
        </div>
      )}
    </li>
  );
}