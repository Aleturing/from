import ButtonModalFirsTime from "./../atoms/ButtonModalFirstTime";
function ModalFirsTimes() {
    return (
        <div
        x-show="firstTime"
        className="fixed glass w-full h-screen left-0 top-0 z-10 flex flex-wrap justify-center content-center p-24"
      >
        <div className="w-96 rounded-3xl p-8 bg-white shadow-xl">
          <div className="text-center">
            <h3 className="text-center text-2xl mb-8">FIRST TIME?</h3>
          </div>
          <div className="text-left">
            <ButtonModalFirsTime
              tittle="LOAD SAMPLE DATA"
              icon="M8 4H6a2 2 0 00-2 2v12a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-2m-4-1v8m0 0l3-3m-3 3L9 8m-5 5h2.586a1 1 0 01.707.293l2.414 2.414a1 1 0 00.707.293h3.172a1 1 0 00.707-.293l2.414-2.414a1 1 0 01.707-.293H20"
              first_button={trues}
            />
            <ButtonModalFirsTime
              tittle="LEAVE IT EMPTY"
              icon="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4"
              first_button={false}
            />
          </div>
        </div>
      </div>
    );
  }
  
  export default ModalFirsTimes;
  