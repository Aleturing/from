import SidebarLink from "../molecules/SidebarLink";
import SidebarIcon from "../molecules/SidebarIcon";
import { useNavigate } from "react-router-dom";

function LeftSideBar({ setOnLogin }) {
  const navigate = useNavigate();

  const logOut = () => {
    setOnLogin({});
    navigate("/login");
  };

  return (
    <div className="flex flex-row w-auto flex-shrink-0 pl-4 pr-2 py-4">
      <div className="flex flex-col items-center py-4 flex-shrink-0 w-20 bg-cyan-500 rounded-3xl">
        <SidebarIcon />
        <ul className="flex flex-col space-y-2 mt-12">
          <SidebarLink to="/operations" icon="operations" label="Operaciones" />
          <SidebarLink to="/products" icon="products" label="Productos" />
          <SidebarLink to="/users" icon="users" label="Usuarios" />
          <SidebarLink to="/sales" icon="sales" label="Ventas" />
        </ul>
        <div className="relative group mt-auto">
          <button
            onClick={logOut}
            className="focus:outline-none"
            title="Cerrar sesión"
          >
            <span className="flex items-center justify-center text-cyan-100 hover:bg-cyan-400 h-12 w-12 rounded-2xl">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                />
              </svg>
            </span>
          </button>
          <span className="absolute left-full ml-3 top-1/2 transform -translate-y-1/2 bg-gray-800 text-white text-lg px-4 py-2 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap z-10">
            Cerrar sesión
          </span>
        </div>
      </div>
    </div>
  );
}

export default LeftSideBar;
