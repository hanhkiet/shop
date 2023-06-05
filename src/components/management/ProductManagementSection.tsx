const link =
  'https://asrv.com/cdn/shop/files/0829Cutoff_Black_400x.jpg?v=1683926407';
const name = "0829. SILVER-LITE™ 2.0 OVERSIZED CUTOFF - BLACK 'OTWR'";

const ProductCard = () => (
  <div className="cursor-pointer rounded p-3 text-center text-neutral-500 transition-all hover:border">
    <img src={link} alt="" />
    <p className="text-sm">{name}</p>
  </div>
);

const ProductManagementSection = () => {
  return (
    <>
      <div className="mx-auto grid grid-cols-4 gap-6 lg:max-w-7xl">
        {Array(20)
          .fill(0)
          .map((_, i) => (
            <ProductCard key={i} />
          ))}
      </div>
    </>
  );
};

export default ProductManagementSection;
