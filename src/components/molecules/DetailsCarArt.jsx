function DetailsCarArt(p) {
  return (
    <div className="flex-grow">
      <h5 className="text-sm" x-text="item.name">{p.tittle}</h5>
      <p className="text-xs block" x-text="priceFormat(item.price)">{p.price}</p>
    </div>
  );
}
export default DetailsCarArt;
