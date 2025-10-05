import { useCart } from "../context/CartContext";

const ProductCard = ({ product }) => {
  const { addToCart } = useCart();
  return (
    <div className="bg-white rounded-lg shadow p-4 flex flex-col">
      <img
        src={product.image}
        alt={product.name}
        className="h-80 sm:h-40 md:h-60 object-cover rounded mb-4"
      />
      <h2 className="text-xl font-semibold">{product.name}</h2>
      <p className="text-sm mb-2 text-gray-500">{product.description}</p>
      <p className="font-semibold text-lg">${product.price.toFixed(2)}</p>
      <button
        onClick={() => addToCart(product)}
        className="bg-blue-600 text-white py-2 px-4 text-sm mt-2 rounded-sm active:bg-blue-900 hover:shadow-xl"
      >
        Add To Cart
      </button>
    </div>
  );
};

export default ProductCard;
