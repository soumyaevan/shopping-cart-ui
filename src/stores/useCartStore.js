import { create } from "zustand";

const useCartStore = create((set, get) => ({
  itemsInCart: [],

  initializeCart: () => {
    const stored = localStorage.getItem("cart");
    if (stored) {
      set({ itemsInCart: JSON.parse(stored) });
    }
  },

  addToCart: (product) => {
    set((state) => {
      const existingItem = state.itemsInCart.find(
        (item) => item.id === product.id
      );
      let newCartItems;

      if (existingItem) {
        newCartItems = state.itemsInCart.map((item) =>
          item.id === product.id ? { ...item, qty: item.qty + 1 } : item
        );
      } else {
        newCartItems = [...state.itemsInCart, { ...product, qty: 1 }];
      }

      localStorage.setItem("cart", JSON.stringify(newCartItems));

      return { itemsInCart: newCartItems };
    });
  },

  removeFromCart: (productId) => {
    set((state) => {
      const newCartItems = state.itemsInCart.filter(
        (item) => item.id !== productId
      );
      localStorage.setItem("cart", JSON.stringify(newCartItems));
      return { itemsInCart: newCartItems };
    });
  },

  removeSingleFromCart: (product) => {
    set((state) => {
      const existingItem = state.itemsInCart.find(
        (item) => item.id === product.id
      );

      let newCartItems;

      if (existingItem) {
        if (existingItem.qty === 1) {
          // If quantity is 1, remove the item completely
          newCartItems = state.itemsInCart.filter(
            (item) => item.id !== product.id
          );
        } else {
          // If quantity is more than 1, just decrease it
          newCartItems = state.itemsInCart.map((item) =>
            item.id === product.id ? { ...item, qty: item.qty - 1 } : item
          );
        }
      } else {
        newCartItems = [...state.itemsInCart];
      }
      localStorage.setItem("cart", JSON.stringify(newCartItems));

      return { itemsInCart: newCartItems };
    });
  },

  clearCart: () => {
    set({ itemsInCart: [] });
    localStorage.setItem("cart", JSON.stringify([]));
  },

  getItemCount: () => {
    const state = get();
    return state.itemsInCart.reduce((total, item) => total + item.qty, 0);
  },

  getTotalPrice: () => {
    const state = get();
    return state.itemsInCart
      .reduce((total, item) => total + item.price * item.qty, 0)
      .toFixed(2);
  },
}));

export default useCartStore;
