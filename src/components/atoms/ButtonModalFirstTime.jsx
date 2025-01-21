function ButtonModalFirsTime(tittle, first_button, color_hover) {
  return (
    <button
      // x-on:click="startBlank()"
      className={"text-left w-full " + first_button? "mb-3 " : " " +  "rounded-xl bg-blue-gray-500 text-white focus:outline-none hover:" + {color_hover} + " px-4 py-4"}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-6 w-6 inline-block -mt-1 mr-2"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d={icon}
        />
      </svg>
      {tittle}
    </button>
  );
}

export default ButtonModalFirsTime;
