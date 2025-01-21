import NotFoundArt from "./NotFoundArt";
import EnterNoResult from "./EnterNoResult";
import ShowArtList from "./ShowArtList";
function BodyStore(p) {
  return (
    <div className="h-full overflow-hidden mt-4">
      <div className="h-full overflow-y-auto px-2">
        <NotFoundArt  condition={false}/>

        <EnterNoResult condition={false}/>

        <ShowArtList carrito={p.carrito} setCarrito={p.setCarrito} letters={p.letters} condition={true} products = {p.products}/>
      </div>
    </div>
  );
}
export default BodyStore;
