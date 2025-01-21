function ActiveUser({ onLogin }) {
  return (
    <div className="flex px-2 flex-row relative">
      <h1 className="bg-white rounded-3xl shadow text-lg full w-full h-16 py-4 pl-16 transition-shadow focus:shadow-2xl focus:outline-none font-semibold">
        Bienvenido: {onLogin.nombre}
      </h1>
    </div>
  );
}
export default ActiveUser;
