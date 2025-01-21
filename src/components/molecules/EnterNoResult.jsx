function EnterNoResult(p) {
  if (p.condition) {
    return (
      <div
        className="select-none bg-blue-gray-100 rounded-3xl flex flex-wrap content-center justify-center h-full opacity-25"
        x-show="filteredProducts().length === 0 && keyword.length > 0"
      >
        <div className="w-full text-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-24 w-24 inline-block"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
          <p className="text-xl">
            EMPTY SEARCH RESULT
            <br />"<span x-text="keyword" className="font-semibold"></span>"
          </p>
        </div>
      </div>
    );
  } else {
    return <></>;
  }
}
export default EnterNoResult;
