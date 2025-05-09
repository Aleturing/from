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
          <SidebarLink to="/operations" icon="operations" title="Operaciones" />
          <SidebarLink to="/products" icon="products" title="Productos" />
          <SidebarLink to="/users" icon="users" title="Usuarios" />
          <SidebarLink to="/sales" icon="sales" title="Ventas" />
        </ul>
        <div
          onClick={() => logOut()}
          title="Cerrar sesión"
          className="mt-auto flex items-center justify-center text-cyan-200 hover:text-cyan-100 h-10 w-10 focus:outline-none cursor-pointer"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-8 w-8"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
              clipRule="evenodd"
            />
          </svg>
        </div>
      </div>
    </div>
  );
}

export default LeftSideBar;
