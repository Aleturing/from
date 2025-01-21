function ChangePositivo(p) {
  if (p.total > 0)
    return (
      <div className="flex mb-3 text-lg font-semibold bg-cyan-50 text-blue-gray-700 rounded-lg py-2 px-3">
        <div className="text-cyan-800">CHANGE</div>
        <div className="text-right flex-grow text-cyan-600">{p.total}</div>
      </div>
    );
}
export default ChangePositivo;
