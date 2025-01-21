function ChangeNegativo(p) {
  if (p.total < 0)
    return (
      <div className="flex mb-3 text-lg font-semibold bg-pink-100 text-blue-gray-700 rounded-lg py-2 px-3">
        <div className="text-right flex-grow text-pink-600">{p.total}</div>
      </div>
    );
}
export default ChangeNegativo;
