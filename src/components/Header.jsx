import { useEffect, useRef, useState } from "react";
// import { useCart } from "../context/CartContext";
import { FaShoppingCart } from "react-icons/fa";
import useCartStore from "../stores/useCartStore";
const Header = () => {
  const [showCartBox, setShowCartBox] = useState(false);
  const cartRef = useRef(null);
  // const { itemInCart, removeFromCart, clearCart } = useCart();
  const {
    itemsInCart,
    removeFromCart,
    removeSingleFromCart,
    clearCart,
    getItemCount,
    getTotalPrice,
    initializeCart,
  } = useCartStore();

  useEffect(() => {
    initializeCart();
  }, [initializeCart]);

  const itemCount = getItemCount();
  const totalPrice = getTotalPrice();

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (cartRef.current && !cartRef.current.contains(event.target)) {
        setShowCartBox(false);
      }
    };
    if (showCartBox) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showCartBox]);

  return (
    <header className="bg-white p-4 flex justify-between items-center shadow-md">
      <h1 className="text-blue-500 font-bold text-2xl pl-2">ShopMate</h1>
      <div className="relative" ref={cartRef}>
        <button
          className="cursor-pointer"
          onClick={() => setShowCartBox(!showCartBox)}
        >
          <FaShoppingCart className="text-2xl text-gray-700" />
          {itemCount > 0 && (
            <span className="absolute bg-red-500 text-white rounded-full w-5 h-5 text-center text-sm -top-2 -right-2">
              {itemCount}
            </span>
          )}
        </button>
        {showCartBox && (
          <div className="absolute right-0 mt-2 w-80 bg-white shadow-lg border rounded z-50">
            <div className="p-4">
              <h2 className="font-semibold text-lg mb-2">Cart Items</h2>
              {itemsInCart.length === 0 ? (
                <p className="text-gray-500 text-sm"> Your cart is empty</p>
              ) : (
                <>
                  <ul className="max-h-60 overflow-y-auto divide-y divide-gray-200">
                    {itemsInCart.map((item) => (
                      <li
                        key={item.id}
                        className="flex justify-between items-center py-2"
                      >
                        <div>
                          <p className="font-semibold">{item.name}</p>
                          <p className="text-sm text-gray-600">
                            {item.qty} x ${item.price}
                          </p>
                        </div>
                        <button
                          className="text-sm text-red-500 hover:underline"
                          onClick={() => removeFromCart(item.id)}
                        >
                          Remove
                        </button>
                        <button
                          className="text-sm text-red-500 hover:underline"
                          onClick={() => removeSingleFromCart(item)}
                        >
                          Reduce
                        </button>
                      </li>
                    ))}
                  </ul>
                  <div className="flex justify-between font-semibold mt-4">
                    <span>Total:</span>
                    <span>${totalPrice}</span>
                  </div>
                  <button
                    className="text-white bg-red-500 px-2 py-1 rounded-md w-full mt-5 hover:bg-red-600"
                    onClick={clearCart}
                  >
                    Clear Cart
                  </button>
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
