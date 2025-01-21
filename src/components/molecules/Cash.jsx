function Cash(p) {
  return (
    <div className="mb-3 text-blue-gray-700 px-3 pt-2 pb-3 rounded-lg bg-blue-gray-50">
      <div className="flex text-lg font-semibold">
        <div className="flex-grow text-left">CASH</div>
        <div className="flex text-right">
          <div className="mr-2">Rp</div>
          {/* <input x-bind:value="numberFormat(cash)" x-on:keyup="updateCash($event.target.value)" type="text" className="w-28 text-right bg-white shadow rounded-lg focus:bg-white focus:shadow-lg px-2 focus:outline-none"> */}
        </div>
      </div>
      {/* <hr className="my-2"> */}
      <div className="grid grid-cols-3 gap-2 mt-2">
        <template x-for="money in moneys">
          <button
            // x-on:click="addCash(money)"
            className="bg-white rounded-lg shadow hover:shadow-lg focus:outline-none inline-block px-2 py-1 text-sm"
          >
            +<span x-text="numberFormat(money)"></span>
          </button>
        </template>
      </div>
    </div>
  );
}
export default Cash;
