import { createContext, useContext, useState } from "react";
import type { CartItem } from "@/types/cart";

type CartContextType = {
  cart: CartItem[];
  addToCart: (item: CartItem) => void;
  removeFromCart: (index: number) => void;
  incrementItem: (index: number) => void;
  decrementItem: (index: number) => void;
};

const CartContext = createContext<CartContextType | null>(null);

export const CartProvider = ({ children }: { children: React.ReactNode }) => {
  const [cart, setCart] = useState<CartItem[]>([]);

  // Add to cart or increment if same
  const addToCart = (item: CartItem) => {
    setCart((prev) => {
      const existingItem = prev.find(
        (p) => p.name === item.name && p.weight === item.weight
      );

      if (existingItem) {
        return prev.map((p) =>
          p.name === item.name && p.weight === item.weight
            ? { ...p, quantity: p.quantity + item.quantity }
            : p
        );
      }

      return [...prev, item];
    });
  };

  // increment quantity by 1
  const incrementItem = (index: number) => {
    setCart((prev) =>
      prev.map((item, i) =>
        i === index ? { ...item, quantity: item.quantity + 1 } : item
      )
    );
  };

  const decrementItem = (index: number) => {
    setCart((prev) =>
      prev
        .map((item, i) =>
          i === index ? { ...item, quantity: item.quantity - 1 } : item
        )
        .filter((item) => item.quantity > 0)
    );
  };

  // remove item completely
  const removeFromCart = (index: number) => {
    setCart((prev) => prev.filter((_, i) => i !== index));
  };

  return (
    <CartContext.Provider
      value={{ cart, addToCart, removeFromCart, incrementItem, decrementItem }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) throw new Error("useCart must be used inside CartProvider");
  return context;
};
