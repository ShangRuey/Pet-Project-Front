import { createContext, useState, useContext, useEffect } from "react";
import axios from "axios";

const CartContext = createContext();

export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    const fetchCartItems = async () => {
      try {
        const response = await axios.get("http://localhost:5000/cart", {
          withCredentials: true,
        });
        setCartItems(response.data);
      } catch (error) {
        console.error("Failed to fetch cart items:", error);
      }
    };

    fetchCartItems();
  }, []);

  const addToCart = async (item) => {
    const updatedCart = [...cartItems];
    const existingItem = updatedCart.find((i) => i.id === item.id);
    if (existingItem) {
      existingItem.amount += item.amount;
    } else {
      updatedCart.push(item);
    }
    setCartItems(updatedCart);
    await saveCartItems(updatedCart);
  };

  const removeFromCart = async (id) => {
    const updatedCart = cartItems.filter((item) => item.id !== id);
    setCartItems(updatedCart);
    await saveCartItems(updatedCart);
  };

  const updateCartItem = async (id, amountChange) => {
    const updatedCart = cartItems.map((item) =>
      item.id === id
        ? { ...item, amount: Math.max(item.amount + amountChange, 1) }
        : item
    );
    setCartItems(updatedCart);
    await saveCartItems(updatedCart);
  };

  const clearCart = async () => {
    setCartItems([]);
    await saveCartItems([]);
  };

  const saveCartItems = async (items) => {
    try {
      await axios.post(
        "http://localhost:5000/cart",
        { items },
        { withCredentials: true }
      );
    } catch (error) {
      console.error("Failed to save cart items:", error);
    }
  };

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        removeFromCart,
        updateCartItem,
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
