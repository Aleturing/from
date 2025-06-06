import { Link } from "react-router-dom";

function SidebarLink({ to, icon, label }) {
  const icons = {
    operations: (
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
          d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z"
        />
      </svg>
    ),
    products: (
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
          d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01"
        />
      </svg>
    ),
    users: (
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
          d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
        />
      </svg>
    ),
    sales: (
      <svg
        viewBox="0 0 256 256"
        width="24"
        height="24"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          fill="#FFFFFF"
          d="M199.8,10H56.2C30.7,10,10,30.7,10,56.2v143.6c0,25.5,20.7,46.2,46.2,46.2h143.6c25.5,0,46.2-20.7,46.2-46.2V56.2C246,30.7,225.3,10,199.8,10z M60.5,202.8h-29v-24.1l28.9-22.9L60.5,202.8L60.5,202.8z M108.7,202.8H79.7v-61.5l14.5-12.1l14.5,12.1V202.8z M156.9,202.8H128v-45.9l6,4.8l22.9-19.3L156.9,202.8L156.9,202.8z M205.2,202.8h-28.9v-76l28.9-24.1V202.8L205.2,202.8z M224.5,105.1L205.2,87L134,144.9l-39.8-32.6l-62.7,49.5v-21.7l62.7-49.5l38.6,32.6l59.1-48.3L169,53.2h55.5V105.1L224.5,105.1z"
        />
      </svg>
    ),
  };

  return (
    <li className="relative group">
      <Link to={to} className="hover:underline">
        <span className="flex items-center justify-center text-cyan-100 hover:bg-cyan-400 h-12 w-12 rounded-2xl">
          {icons[icon]}
        </span>
        <span className="absolute left-full ml-3 top-1/2 transform -translate-y-1/2 bg-gray-800 text-white text-lg px-4 py-2 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap z-10">
          {label}
        </span>
      </Link>
    </li>
  );
}

export default SidebarLink;
